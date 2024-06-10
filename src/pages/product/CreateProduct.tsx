import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  theme,
} from 'antd';
import { createUser } from '../../http/api/user.api';
import { useEffect, useMemo, useState } from 'react';
import { getCategoryList } from '../../http/api/category.api';

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const CreateRestaurant = ({ open, setOpen }: Props) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [categories, setCategories] = useState<any | null>(null);
  console.log(categories, 'categories =========');

  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const onClose = () => {
    setOpen(false);
    form.resetFields();
  };

  const onFinish = async () => {
    try {
      try {
        await form.validateFields();
      } catch (error) {
        return;
      }
      const data = form.getFieldsValue();
      console.log(data);
      await createUser({ ...data, createdByAdmin: true });
      messageApi.open({
        type: 'success',
        content: 'User created successfully !',
      });
      setOpen(false);
      form.resetFields();
    } catch (error: any) {
      console.log(error);
      messageApi.open({
        type: 'error',
        content: error?.message || 'Failed to create user !',
      });
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
      const response = await getCategoryList();
      setCategories(response?.data?.categories);
    } catch (error: any) {
      messageApi.open({
        type: 'error',
        content: error?.message,
      });
    }
  };

  const CategoryOptions = useMemo(() => {
    return categories?.map((category: any) => {
      return {
        label: category?.name,
        value: category?._id,
      };
    });
  }, [categories]);

  return (
    <>
      {contextHolder}
      <Drawer
        title="Create a new User"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            background: colorBgLayout,
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" htmlType="submit" onClick={onFinish}>
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Product Name"
                rules={[
                  { required: true, message: 'Please enter product name' },
                ]}
              >
                <Input placeholder="Please enter product name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="role"
                label="Role"
                rules={[
                  { required: true, message: 'Please choose the category' },
                ]}
              >
                <Select
                  placeholder="Please select an category"
                  options={CategoryOptions}
                  onChange={(e) => console.log(e)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: 'Please enter user email',
                  },
                ]}
              >
                <Input placeholder="Please enter user email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: 'Please enter user password' },
                ]}
              >
                <Input.Password placeholder="Please enter user password" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default CreateRestaurant;

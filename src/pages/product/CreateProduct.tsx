import {
  Button,
  Card,
  Col,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Switch,
  theme,
} from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { getCategoryList } from '../../http/api/category.api';
import UploadImage from '../../components/UploadImage';
import { getTenants } from '../../http/api/tenant.api';
import PriceConfiguration from './PriceConfiguration';
import Attributes from './Attributes';

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const CreateRestaurant = ({ open, setOpen }: Props) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [categories, setCategories] = useState<any | null>(null);
  const [tenants, setTenants] = useState<any | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  console.log(categories, 'categories =========');

  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const onClose = () => {
    setOpen(false);
    setSelectedCategory(null);
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
    getTenantsList();
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

  const getTenantsList = async () => {
    try {
      const response = await getTenants(1, 100);
      setTenants(response?.data?.tenants);
    } catch (error: any) {
      messageApi.open({
        type: 'error',
        content: error?.message,
      });
    }
  };

  const TenantOptions = useMemo(() => {
    return tenants?.map((category: any) => {
      return {
        label: category?.name,
        value: category?.id,
      };
    });
  }, [tenants]);

  const handleSelectCategory = (value: any) => {
    const category = categories.find((c: any) => c?._id === value);
    console.log(category, value, categories);
    if (category) {
      setSelectedCategory(category);
    }
  };

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
          <Card title="Product Info" style={{ marginBottom: '20px' }}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Product Name"
                  rules={[
                    { required: true, message: 'Please enter product name' },
                  ]}
                >
                  <Input
                    placeholder="Please enter product name"
                    maxLength={30}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="category"
                  label="Category"
                  rules={[
                    { required: true, message: 'Please choose the category' },
                  ]}
                >
                  <Select
                    placeholder="Please select an category"
                    options={CategoryOptions}
                    onChange={handleSelectCategory}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    { required: true, message: 'Please enter description' },
                  ]}
                >
                  <Input.TextArea
                    rows={2}
                    style={{ resize: 'none' }}
                    maxLength={100}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card title="Product image" style={{ marginBottom: '20px' }}>
            <Row gutter={16}>
              <Col span={12}>
                <UploadImage />
              </Col>
            </Row>
          </Card>

          {selectedCategory && selectedCategory?.priceConfiguration && (
            <Card title="Price Configuration" style={{ marginBottom: '20px' }}>
              <PriceConfiguration data={selectedCategory?.priceConfiguration} />
            </Card>
          )}
          {selectedCategory && selectedCategory?.attributes && (
            <Card title="Attributes" style={{ marginBottom: '20px' }}>
              <Attributes data={selectedCategory?.attributes} />
            </Card>
          )}

          <Card title="Tenant Info" style={{ marginBottom: '20px' }}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="tenantId"
                  label="tenant"
                  rules={[
                    { required: true, message: 'Please choose the tenant' },
                  ]}
                >
                  <Select
                    placeholder="Please select an tenant"
                    options={TenantOptions}
                    onChange={(e) => console.log(e)}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card title="Additional Info">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="isPublish" label="Publish" initialValue={true}>
                  <Switch checkedChildren="Yes" unCheckedChildren="No" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form>
      </Drawer>
    </>
  );
};

export default CreateRestaurant;

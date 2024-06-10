import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Space,
  theme,
} from 'antd';
import { createTenant } from '../../http/api/tenant.api';

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const CreateRestaurant = ({ open, setOpen }: Props) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

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
      await createTenant(data);
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

  return (
    <>
      {contextHolder}
      <Drawer
        title="Create a new Restaurant"
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
          <Row>
            <Col span={20}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter restaurant name',
                    max: 30,
                  },
                ]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={20}>
              <Form.Item
                name="address"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: 'Please enter restaurant address',
                    max: 50,
                  },
                ]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default CreateRestaurant;

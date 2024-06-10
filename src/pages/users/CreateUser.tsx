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
import { Roles } from '../../constants';
import { createUser } from '../../http/api/user.api';

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const RoleOptions = [
  {
    label: 'Admin',
    value: Roles.ADMIN,
  },
  {
    label: 'Manager',
    value: Roles.MANAGER,
  },
  {
    label: 'Customer',
    value: Roles.CUSTOMER,
  },
];

const CreateUser = ({ open, setOpen }: Props) => {
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
                name="firstName"
                label="First Name"
                rules={[
                  { required: true, message: 'Please enter user first name' },
                ]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[
                  { required: true, message: 'Please enter user last name' },
                ]}
              >
                <Input placeholder="Please enter user name" />
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
            <Col span={12}>
              <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: 'Please choose the role' }]}
              >
                <Select
                  placeholder="Please select an owner"
                  options={RoleOptions}
                />
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

export default CreateUser;

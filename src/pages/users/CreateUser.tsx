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
  theme,
} from 'antd';
import { Roles } from '../../constants';
import { createUser } from '../../http/api/user.api';
import { getTenants } from '../../http/api/tenant.api';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';

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
  const [tenants, setTenants] = useState<any | null>(null);

  const getTenantsData = async (page: number, limit: number) => {
    return await getTenants(page, limit);
  };

  const { refetch } = useQuery({
    queryKey: ['tenants'],
    queryFn: async () => {
      const response = await getTenantsData(1, 100);
      console.log(response);
      return response?.data;
    },
    retry: false,
    enabled: false,
  });

  useEffect(() => {
    (async () => {
      const data = await refetch();
      setTenants(data?.data);
      console.log('calling =====', data?.data);
    })();
  }, []);

  const TenantOptions = useMemo(() => {
    return tenants?.tenants?.map((tenant: any) => {
      return {
        value: tenant?.id,
        label: tenant?.name,
      };
    });
  }, [tenants]);

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
          <Card title="User information" style={{ marginBottom: '20px' }}>
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
                  rules={[
                    { required: true, message: 'Please choose the role' },
                  ]}
                >
                  <Select
                    placeholder="Please select an owner"
                    options={RoleOptions}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card title="Security Information" style={{ marginBottom: '20px' }}>
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
          </Card>
          <Card title="Tenant Information" style={{ marginBottom: '20px' }}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="tenant"
                  label="Tenant"
                  rules={[{ required: true, message: 'Please enter tenant' }]}
                >
                  <Select
                    placeholder="Please select an tenant"
                    options={TenantOptions}
                    onChange={(v) => console.log('testing', v)}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form>
      </Drawer>
    </>
  );
};

export default CreateUser;

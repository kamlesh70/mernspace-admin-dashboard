import { LockFilled, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Form, FormProps, Input, Layout, Space } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";

import { LoginFieldType } from "../../types";
import { login, logout, self } from "../../http/api/auth.api";
import { useAuthStore } from "../../zustand/store";
import useHasPermission from "../../hooks/useHasPermission";
import { enqueueSnackbar } from "notistack";

const LoginPage = () => {

  const { setUser, logout: logoutStore } = useAuthStore();
  const { isAllowed } = useHasPermission();

  const getSelf = async () => {
    const { data } = await self();
    console.log(data, "data   dddddddddddd");
    return data;
  }

  const { refetch } = useQuery({
    queryKey: ['self'],
    queryFn: getSelf,
    enabled: false,
    retry: false, 
  })

  const loginHandler =  async (credentials: LoginFieldType) => {
    const { data } = await login(credentials);
    return data;
  }

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginHandler,
    retry: false, 
    onSuccess: async () => {
      const selfData = await refetch();
      setUser(selfData.data);
      if(!isAllowed(selfData.data)){
        await logout();
        logoutStore();
        enqueueSnackbar("Invalid credentials !", { variant: "error" });
      }
    }
  })

  const onFinish: FormProps<LoginFieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    mutate(values);
  };

  return (
    <Layout
      style={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
      }}
    >
      <Card
        title={
          <Space
            style={{
              width: "100%",
              fontSize: 16,
              justifyContent: "center",
            }}
          >
            <LockFilled />
            Sign In
          </Space>
        }
        bordered={false}
        style={{
          width: "22rem",
          justifyContent: "center",
        }}
      >
        <Form
          onFinish={onFinish}
        > 
        {
          isError && 
          <Alert style={{ marginBottom: '20px' }} type="error" message={error.message || "failed to login"}/>
        }
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter email!", type: 'email' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="User Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item style={{ marginBottom: "10px" }}>
            <a href="#">Forgot password</a>
          </Form.Item>
          <Form.Item>
            <Button loading={isPending} type="primary" htmlType="submit" style={{ width: "100%" }}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
};

export default LoginPage;

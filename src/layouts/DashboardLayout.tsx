import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../zustand/store";
import { isEmpty } from "lodash";
import { APP_PATHS } from "../router/router-path";
import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import navConfig from "./nev-item";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Sider, Header, Content } = Layout

const DashboardLayout = () => {

    const { user } = useAuthStore();
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    if(isEmpty(user)) {
        return (
            <Navigate to={APP_PATHS.login.root} replace={true}/>
        )
    }

    return (
        <Layout style={{ height: '100vh' }} >
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['/']}
            items={navConfig}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    )
}


export default DashboardLayout;
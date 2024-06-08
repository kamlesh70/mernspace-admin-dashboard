import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../zustand/store';
import { Button, Layout, Menu, theme } from 'antd';
import { useMemo, useState } from 'react';
import navConfig, { navBarItems } from './nev-item';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import AccountPopup from '../components/AccountPopup';
import Logo from '../components/Logo';

const { Sider, Header, Content } = Layout;

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navbarConfig = useMemo(() => {
    const config = navConfig.filter((nav) =>
      nav.allowed.includes(user?.role as string),
    );
    return config;
  }, [user]);

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => navigate({ pathname: '/' })}
        >
          <Logo width={70} height={70} />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[
            navBarItems.includes(`/${location.pathname?.split('/')?.[1]}`)
              ? location.pathname
              : '/',
          ]}
          items={navbarConfig}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
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
          <AccountPopup />
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;

import { RightOutlined } from "@ant-design/icons";
import { Breadcrumb, theme } from "antd";

function Users() {

    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

  return (
    <>
        <Breadcrumb separator={<RightOutlined />} style={{ margin: '16px' }}>
            <Breadcrumb.Item >Home</Breadcrumb.Item>
            <Breadcrumb.Item>Users</Breadcrumb.Item>
        </Breadcrumb>
        <div 
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                          }}
        >

        </div>
    </>
  )
}

export default Users;
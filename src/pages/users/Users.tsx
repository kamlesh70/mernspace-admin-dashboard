import { RightOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Table, theme } from "antd";
import { getUsersList } from "../../http/api/user.api";


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Created Date',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
];


function Users() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const getUsers = async () => {
    return await getUsersList();
  }

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: (async () => {
      const response = await getUsers();
      console.log(response);
      return response?.data;
    }),
    retry: false
  })

  return (
    <>
      <Breadcrumb separator={<RightOutlined />} style={{ margin: "16px" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Users</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          margin: "24px 16px",
          padding: 5,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Table dataSource={users} columns={columns} rowKey={'id'}/>
      </div>
    </>
  );
}

export default Users;

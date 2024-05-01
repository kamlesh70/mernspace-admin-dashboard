import { RightOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Breadcrumb, Table, theme } from 'antd';
import { getUsersList } from '../../http/api/user.api';
import SearchFilter from '../../components/filters/SearchFilter';
import { useEffect, useState } from 'react';
import CreateUser from './CreateUser';
import { formatDate } from '../../utils/dateFormatter';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (_name: any, data: any) => {
      return `${data?.firstName} ${data?.lastName}`;
    },
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
    render: (date: Date) => formatDate(date),
  },
];

const statusOptions = [
  {
    value: 'Active',
    label: 'active',
  },
  {
    value: 'Inactive',
    label: 'inactive',
  },
  {
    value: 'Ban',
    label: 'ban',
  },
];

function Users() {
  const [search, setSearch] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [createUser, setCreateUser] = useState<boolean>(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const getUsers = async () => {
    return await getUsersList();
  };

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await getUsers();
      console.log(response);
      return response?.data;
    },
    retry: false,
  });

  useEffect(() => {
    // TODO: create a query for these search fields and make a request to the user list
    console.log(search, 'search', role, 'role', status, 'status');
  }, [search, role, status]);

  const onCreateNewHandler = () => {
    setCreateUser(true);
  };

  return (
    <>
      <CreateUser open={createUser} setOpen={setCreateUser} />
      <Breadcrumb separator={<RightOutlined />} style={{ margin: '16px' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Users</Breadcrumb.Item>
      </Breadcrumb>
      <SearchFilter
        forTable={['User']}
        statusOptions={statusOptions}
        onSearch={setSearch}
        onRoleChange={setRole}
        onStatusChange={setStatus}
        onCreateNew={onCreateNewHandler}
      />
      <div
        style={{
          margin: '24px 16px',
          padding: 5,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Table dataSource={users} columns={columns} rowKey={'id'} />
      </div>
    </>
  );
}

export default Users;

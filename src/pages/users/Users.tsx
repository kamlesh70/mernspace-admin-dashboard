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
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(5);
  const [users, setUsers] = useState<any | null>(null);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const getUsers = async (page: number, limit: number) => {
    return await getUsersList(page, limit);
  };

  const { refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await getUsers(page, limit);
      console.log(response);
      return response?.data;
    },
    retry: false,
    enabled: false,
  });

  useEffect(() => {
    (async () => {
      const data = await refetch();
      setUsers(data?.data);
      console.log('calling =====', data?.data);
    })();
  }, [page, limit, search, role, status, open]);

  const onCreateNewHandler = () => {
    setCreateUser(true);
  };

  const onPageChange = (page: number) => {
    setPage(page);
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
        <Table
          pagination={{
            pageSize: limit,
            onChange: onPageChange,
            total: users?.userCount,
          }}
          dataSource={users?.users}
          columns={columns}
          rowKey={'id'}
        />
      </div>
    </>
  );
}

export default Users;

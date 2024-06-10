import { RightOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Breadcrumb, Table, theme } from 'antd';
import SearchFilter from '../../components/filters/SearchFilter';
import { useEffect, useState } from 'react';
import { formatDate } from '../../utils/dateFormatter';
import CreateRestaurant from './CreateRestaurant';
import { getTenants } from '../../http/api/tenant.api';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Created Date',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (date: Date) => formatDate(date),
  },
];

function Restaurants() {
  const [search, setSearch] = useState<string | null>(null);
  const [createRestaurant, setCreateRestaurant] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(5);
  const [tenants, setTenants] = useState<any | null>(null);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const getTenantsData = async (page: number, limit: number) => {
    return await getTenants(page, limit);
  };

  const { refetch } = useQuery({
    queryKey: ['tenants'],
    queryFn: async () => {
      const response = await getTenantsData(page, limit);
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
  }, [page, limit, search, createRestaurant]);

  const onCreateNewHandler = () => {
    setCreateRestaurant(true);
  };

  const onPageChange = (page: number, pageSize: number) => {
    console.log(page, pageSize);
    setPage(page);
  };

  return (
    <>
      <CreateRestaurant open={createRestaurant} setOpen={setCreateRestaurant} />
      <Breadcrumb separator={<RightOutlined />} style={{ margin: '16px' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Restaurants</Breadcrumb.Item>
      </Breadcrumb>
      <SearchFilter
        forTable={['Restaurant']}
        onSearch={setSearch}
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
            total: tenants?.tenantCount,
          }}
          dataSource={tenants?.tenants}
          columns={columns}
          rowKey={'id'}
        />
      </div>
    </>
  );
}

export default Restaurants;

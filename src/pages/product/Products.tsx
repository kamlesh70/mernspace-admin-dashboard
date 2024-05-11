import { RightOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Breadcrumb, Table, theme } from 'antd';
import SearchFilter from '../../components/filters/SearchFilter';
import { useEffect, useState } from 'react';
import { formatDate } from '../../utils/dateFormatter';
import { getProductList } from '../../http/api/product.api';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Tenant',
    dataIndex: 'tenantId',
    key: 'tenantId',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'isPublish',
    dataIndex: 'isPublish',
    key: 'isPublish',
    render: (isPublish: boolean) => {
      return isPublish ? 'Yes' : 'No';
    },
  },
  {
    title: 'Category',
    dataIndex: 'categoryId',
    key: 'categoryId',
    render: (category: any) => {
      return category?.name;
    },
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

function Products() {
  const [search, setSearch] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const getProducts = async () => {
    return await getProductList();
  };

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await getProducts();
      console.log(response, 'responsssssssssssss');
      return response?.data;
    },
    retry: false,
  });

  useEffect(() => {
    // TODO: create a query for these search fields and make a request to the user list
    console.log(search, 'search', role, 'role', status, 'status');
  }, [search, role, status]);

  const onCreateNewHandler = () => {};

  return (
    <>
      <Breadcrumb separator={<RightOutlined />} style={{ margin: '16px' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Products</Breadcrumb.Item>
      </Breadcrumb>
      <SearchFilter
        forTable={['Product']}
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
        <Table dataSource={products} columns={columns} rowKey={'id'} />
      </div>
    </>
  );
}

export default Products;

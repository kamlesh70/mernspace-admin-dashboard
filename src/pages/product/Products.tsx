import { RightOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Breadcrumb, Table, theme } from 'antd';
import SearchFilter from '../../components/filters/SearchFilter';
import { useEffect, useState } from 'react';
import { formatDate } from '../../utils/dateFormatter';
import { getProductList } from '../../http/api/product.api';
import CreateRestaurant from './CreateProduct';

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
    title: 'Publish',
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

function Products() {
  const [search, setSearch] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(5);
  const [products, setProducts] = useState<any | null>(null);
  const [createProduct, setCreateProduct] = useState<boolean>(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const getProducts = async (page: number, limit: number) => {
    return await getProductList(page, limit);
  };

  const { refetch } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await getProducts(page, limit);
      return response?.data;
    },
    retry: false,
    enabled: false,
  });

  const onCreateNewHandler = () => {
    setCreateProduct(true);
  };

  useEffect(() => {
    (async () => {
      const data = await refetch();
      setProducts(data?.data);
      console.log('calling =====', data?.data);
    })();
  }, [page, limit, search, createProduct, createProduct]);

  const onPageChange = (page: number, pageSize: number) => {
    console.log(page, pageSize);
    setPage(page);
  };

  return (
    <>
      <CreateRestaurant open={createProduct} setOpen={setCreateProduct} />
      <Breadcrumb separator={<RightOutlined />} style={{ margin: '16px' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Products</Breadcrumb.Item>
      </Breadcrumb>
      <SearchFilter
        forTable={['Product']}
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
            total: products?.productCount,
          }}
          scroll={{ scrollToFirstRowOnChange: true }}
          dataSource={products?.products}
          columns={columns}
          rowKey={'id'}
        />
      </div>
    </>
  );
}

export default Products;

import { RightOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Table, theme } from "antd";
import SearchFilter from "../../components/filters/SearchFilter";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/dateFormatter";
import CreateRestaurant from "./CreateRestaurant";
import { getTenants } from "../../http/api/tenant.api";


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
    render: (date: Date) => formatDate(date)
  },
];


function Restaurants() {
  const [search, setSearch] = useState<string | null>(null);
  const [createRestaurant, setCreateRestaurant] = useState<boolean>(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const getTenantsData = async () => {
    return await getTenants();
  }

  const { data: tenants } = useQuery({
    queryKey: ['users'],
    queryFn: (async () => {
      const response = await getTenantsData();
      console.log(response);
      return response?.data;
    }),
    retry: false
  })

  useEffect(() => {
    // TODO: create a query for these search fields and make a request to the user list
  }, [search])

  const onCreateNewHandler = () => {
    setCreateRestaurant(true);
  }

  return (
    <>
      <CreateRestaurant open={createRestaurant} setOpen={setCreateRestaurant} />
      <Breadcrumb separator={<RightOutlined />} style={{ margin: "16px" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Restaurants</Breadcrumb.Item>
      </Breadcrumb>
      <SearchFilter
        forTable={["Restaurant"]}
        onSearch = {setSearch}
        onCreateNew = {onCreateNewHandler}
      />
      <div
        style={{
          margin: "24px 16px",
          padding: 5,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Table dataSource={tenants} columns={columns} rowKey={'id'}/>
      </div>
    </>
  );
}

export default Restaurants;

import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Input, Row, Select, theme } from 'antd';
import { Roles } from '../../constants';

type Props = {
  forTable: string[];
  statusOptions?: any;
  onSearch: (value: string | null) => void;
  onRoleChange?: (value: string | null) => void;
  onStatusChange?: (value: string | null) => void;
  onCreateNew: () => void;
};

const RoleOptions = [
  {
    label: 'Admin',
    value: Roles.ADMIN,
  },
  {
    label: 'Manager',
    value: Roles.MANAGER,
  },
  {
    label: 'Customer',
    value: Roles.CUSTOMER,
  },
];

function SearchFilter({
  forTable,
  statusOptions,
  onSearch,
  onRoleChange,
  onStatusChange,
  onCreateNew,
}: Props) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Card
      bordered={false}
      style={{
        margin: '24px 16px',
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <Row justify="space-between">
        <Row gutter={20}>
          <Col>
            <Input.Search
              onChange={(e: any) => onSearch(e?.target?.value)}
              placeholder="Search"
              allowClear
            />
          </Col>
          {onRoleChange && (
            <Col>
              <Select
                onSelect={(value) => onRoleChange(value)}
                placeholder="Role"
                style={{ width: 120 }}
                allowClear
                options={RoleOptions}
                onClear={() => onRoleChange(null)}
              />
            </Col>
          )}
          {statusOptions && onStatusChange ? (
            <Col>
              <Select
                placeholder="Status"
                style={{ width: 120 }}
                allowClear
                options={statusOptions}
                onSelect={(value) => onStatusChange(value)}
                onClear={() => onStatusChange(null)}
              />
            </Col>
          ) : (
            <></>
          )}
        </Row>
        <Col>
          <Button onClick={onCreateNew} type="primary" icon={<PlusOutlined />}>
            Create {forTable}
          </Button>
        </Col>
      </Row>
    </Card>
  );
}

export default SearchFilter;

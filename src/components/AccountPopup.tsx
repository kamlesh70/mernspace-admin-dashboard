import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown } from 'antd';
import { useAuthStore } from '../zustand/store';
import { logout } from '../http/api/auth.api';

function AccountPopup() {
  const { logout: clearStore } = useAuthStore();

  const items = [
    {
      key: '1',
      danger: true,
      label: 'Logout',
      onClick: () => {
        logout();
        clearStore();
      },
    },
  ];

  return (
    <div style={{ marginRight: '20px' }}>
      <Dropdown menu={{ items }}>
        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />}>
          test
        </Avatar>
      </Dropdown>
    </div>
  );
}

export default AccountPopup;

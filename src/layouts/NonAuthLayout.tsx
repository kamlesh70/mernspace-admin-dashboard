import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../zustand/store';
import { isEmpty } from 'lodash';
import { APP_PATHS } from '../router/router-path';

const NonAuthLayout = () => {
  const { user } = useAuthStore();

  if (!isEmpty(user)) {
    return <Navigate to={APP_PATHS.root} replace={true} />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default NonAuthLayout;

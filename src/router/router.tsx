import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/login/login';
import { APP_PATHS } from './router-path';
import DashboardLayout from '../layouts/DashboardLayout';
import Root from '../components/Root';
import Home from '../pages/Home';
import NonAuthLayout from '../layouts/NonAuthLayout';
import Users from '../pages/users/Users';
import Restaurants from '../pages/restaurants/Restaurants';
import Products from '../pages/product/Products';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <DashboardLayout />,
        children: [
          {
            path: '',
            element: <Home />,
          },
          {
            path: '/users',
            element: <Users />,
          },
          {
            path: '/products',
            element: <Products />,
          },
          {
            path: '/restaurants',
            element: <Restaurants />,
          },
        ],
      },
      {
        path: APP_PATHS.login.root,
        element: <NonAuthLayout />,
        children: [
          {
            path: '',
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
]);

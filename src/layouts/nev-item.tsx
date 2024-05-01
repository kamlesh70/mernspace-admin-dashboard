import { NavLink } from 'react-router-dom';
import { APP_PATHS } from '../router/router-path';
import Icon from '@ant-design/icons/lib/components/Icon';
import HomeIcon from '../components/icons/HomeIcon';
import GiftIcon from '../components/icons/GiftIcon';
import UserIcon from '../components/icons/UserIcon';
import { Roles } from '../constants';
import { foodIcon } from '../components/icons/FoodIcon';

const navConfig = [
  {
    key: '/',
    icon: <Icon component={HomeIcon} />,
    label: <NavLink to={APP_PATHS.root}>Home</NavLink>,
    allowed: [`${Roles.ADMIN}`, `${Roles.MANAGER}`],
  },
  {
    key: '/users',
    icon: <Icon component={UserIcon} />,
    label: <NavLink to={APP_PATHS.users.root}> Users </NavLink>,
    allowed: [`${Roles.ADMIN}`],
  },
  {
    key: '/restaurants',
    icon: <Icon component={foodIcon} />,
    label: <NavLink to={APP_PATHS.restaurants.root}> Restaurants </NavLink>,
    allowed: [`${Roles.ADMIN}`],
  },
  {
    key: '/products',
    icon: <Icon component={GiftIcon} />,
    label: <NavLink to={APP_PATHS.products.root}> Products </NavLink>,
    allowed: [`${Roles.ADMIN}`, `${Roles.MANAGER}`],
  },
];

/*
 * TO-DO : if any new sidebar item is added make sure you are adding that in this array as well
 */
export const navBarItems = ['/users', '/products', '/restaurants'];

export default navConfig;

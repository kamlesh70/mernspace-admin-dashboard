import { NavLink } from "react-router-dom";
import { APP_PATHS } from "../router/router-path";
import Icon from "@ant-design/icons/lib/components/Icon";
import HomeIcon from "../components/icons/HomeIcon";
import GiftIcon from "../components/icons/GiftIcon";
import UserIcon from "../components/icons/UserIcon";


const navConfig = [
    {
        key: '/',
        icon: <Icon component={HomeIcon} />,
        label: <NavLink to={APP_PATHS.root}>Home</NavLink>,
    },
    {
      key: '/users',
      icon: <Icon component={UserIcon} />,
      label: <NavLink to={APP_PATHS.users.root}> Users </NavLink>,
    },
    {
      key: '/products',
      icon: <Icon component={GiftIcon} />,
      label: <NavLink to={APP_PATHS.products.root}> Products </NavLink>,
    },
]

export default navConfig;
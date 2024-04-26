import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../zustand/store";
import { isEmpty } from "lodash";
import { APP_PATHS } from "../router/router-path";

const DashboardLayout = () => {

    const { user } = useAuthStore();

    if(isEmpty(user)) {
        return (
            <Navigate to={APP_PATHS.login.root} replace={true}/>
        )
    }

    return (
        <div>
            <h1>This is Dashboard layout</h1>
            <Outlet />
        </div>
    )
}


export default DashboardLayout;
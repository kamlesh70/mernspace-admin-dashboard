import { Roles } from "../types";

const useHasPermission = () => {
    const allowedRoles = [Roles.ADMIN, Roles.MANAGER];
    const _hasPermission = (user: any) => {
        if(allowedRoles.includes(user?.role)){
           return true; 
        }
        return false;
    }

    return {
        isAllowed: _hasPermission,
    }
}

export default useHasPermission;
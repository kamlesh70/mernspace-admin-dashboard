import apiClient from '../client';
import { AUTH_SERVICE } from '../constant';

export const getUsersList = () => apiClient.get(`${AUTH_SERVICE}/user/list`);

import apiClient from '../client';
import { AUTH_SERVICE } from '../constant';

export const getTenants = () => apiClient.get(`${AUTH_SERVICE}/tenant`);

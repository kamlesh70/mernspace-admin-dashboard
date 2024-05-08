import apiClient from '../client';
import { AUTH_SERVICE } from './auth.api';

export const getTenants = () => apiClient.get(`${AUTH_SERVICE}/tenant`);

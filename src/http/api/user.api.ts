import apiClient from '../client';
import { AUTH_SERVICE } from './auth.api';

export const getUsersList = () => apiClient.get(`${AUTH_SERVICE}/user/list`);

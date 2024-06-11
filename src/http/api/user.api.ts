import { apiErrorHandler } from '../../utils/apiErrorHandler';
import apiClient from '../client';
import { AUTH_SERVICE } from '../constant';

export const getUsersList = (page: number, limit: number) => {
  const cb = () =>
    apiClient.get(`${AUTH_SERVICE}/user/list?page=${page}&limit=${limit}`);
  return apiErrorHandler(cb, 'Failed to fetch users list !');
};

export const createUser = (data: any) => {
  const cb = () => apiClient.post(`${AUTH_SERVICE}/auth/register`, data);
  return apiErrorHandler(cb, 'Failed to create user !');
};

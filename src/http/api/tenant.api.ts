import { apiErrorHandler } from '../../utils/apiErrorHandler';
import apiClient from '../client';
import { AUTH_SERVICE } from '../constant';

export const getTenants = (page: number, limit: number) =>
  apiClient.get(`${AUTH_SERVICE}/tenant?page=${page}&limit=${limit}`);

export const createTenant = (data: any) => {
  const cb = () => apiClient.post(`${AUTH_SERVICE}/tenant/create`, data);
  return apiErrorHandler(cb, 'Failed to create restaurant !');
};

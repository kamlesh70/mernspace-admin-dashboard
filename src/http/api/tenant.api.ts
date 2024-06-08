import apiClient from '../client';
import { AUTH_SERVICE } from '../constant';

export const getTenants = (page: number, limit: number) =>
  apiClient.get(`${AUTH_SERVICE}/tenant?page=${page}&limit=${limit}`);

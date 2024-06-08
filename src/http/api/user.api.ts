import apiClient from '../client';
import { AUTH_SERVICE } from '../constant';

export const getUsersList = (page: number, limit: number) =>
  apiClient.get(`${AUTH_SERVICE}/user/list?page=${page}&limit=${limit}`);

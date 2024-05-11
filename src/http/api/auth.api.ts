import { LoginFieldType } from '../../types';
import apiClient from '../client';
import { AUTH_SERVICE } from '../constant';


export const login = (credentials: LoginFieldType) =>
  apiClient.post(`${AUTH_SERVICE}/auth/login`, credentials);
export const self = () => apiClient.get(`${AUTH_SERVICE}/auth/self`);
export const logout = () => apiClient.post('${AUTH_SERVICE}/auth/logout');

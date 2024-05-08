import { LoginFieldType } from '../../types';
import apiClient from '../client';

export const AUTH_SERVICE = '/api/auth';

export const login = (credentials: LoginFieldType) =>
  apiClient.post('/auth/login', credentials);
export const self = () => apiClient.get(`${AUTH_SERVICE}/auth/self`);
export const logout = () => apiClient.post('${AUTH_SERVICE}/auth/logout');

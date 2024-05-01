import { LoginFieldType } from '../../types';
import apiClient from '../client';

export const login = (credentials: LoginFieldType) =>
  apiClient.post('/auth/login', credentials);
export const self = () => apiClient.get('/auth/self');
export const logout = () => apiClient.post('/auth/logout');

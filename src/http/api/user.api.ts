import apiClient from '../client';

export const getUsersList = () => apiClient.get('/user/list');

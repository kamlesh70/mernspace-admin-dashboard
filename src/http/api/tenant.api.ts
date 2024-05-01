import apiClient from "../client";

export const getTenants = () => apiClient.get('/tenant')
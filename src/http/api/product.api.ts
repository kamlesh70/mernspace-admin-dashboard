import { apiErrorHandler } from '../../utils/apiErrorHandler';
import apiClient from '../client';
import { CATALOG_SERVICE } from '../constant';

export const getProductList = (page: number, limit: number) =>
  apiClient.get(`${CATALOG_SERVICE}/product/list?page=${page}&limit=${limit}`);


export const createProduct = (data: any) => {
  const cb = () => apiClient.post(`${CATALOG_SERVICE}/product/create`, data);
  return apiErrorHandler(cb, 'Failed to create product!');
};

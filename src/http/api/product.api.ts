import apiClient from '../client';
import { CATALOG_SERVICE } from '../constant';

export const getProductList = (page: number, limit: number) =>
  apiClient.get(`${CATALOG_SERVICE}/product/list?page=${page}&limit=${limit}`);

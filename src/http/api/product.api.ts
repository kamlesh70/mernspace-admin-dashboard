import apiClient from '../client';
import { CATALOG_SERVICE } from '../constant';

export const getProductList = () => apiClient.get(`${CATALOG_SERVICE}/product/list`);

import { apiErrorHandler } from '../../utils/apiErrorHandler';
import apiClient from '../client';
import { CATALOG_SERVICE } from '../constant';

export const getCategoryList = () => {
  const cb = () => apiClient.get(`${CATALOG_SERVICE}/category/list`);
  return apiErrorHandler(cb, 'Failed to fetch category list !');
}


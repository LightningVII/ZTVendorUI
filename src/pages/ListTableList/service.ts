import { request } from 'umi';
import { TableListParams, TableListItem } from './data.d';

export const getVendorCategories = async () => request('/strapi/vendor-categories');

export const getCompanies = async (params?: any) => {
  const a = params;
  delete a.showSizeChanger;
  delete a.total;
  return request('/strapi/companies', { params: a });
};

export async function queryRule(params?: TableListParams) {
  return request('/api/rule', {
    params,
  });
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListItem) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}

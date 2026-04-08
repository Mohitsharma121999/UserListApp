import axios from 'axios';

import types from '../redux/types';
import { store } from '../redux/store';
import { showError } from './helperFunction';

const { dispatch } = store;

export async function getHeaders() {
  return {}; 
}

type Methods = 'head' | 'options' | 'put' | 'post' | 'patch' | 'delete' | 'get';

export async function apiReq(
  endPoint = '',
  data = {},
  method: Methods,
  headers = {},
  requestOptions = {},
) {
  console.log("Requesting:", endPoint, "Method:", method);

  return new Promise(async (res, rej) => {
    const getTokenHeader = await getHeaders();
    headers = {
      ...getTokenHeader,
      ...headers,
    };

    const config: any = {
      method,
      url: endPoint,
      headers,
    };

    if (method === 'get' || method === 'delete') {
      config.params = data; 
    } else {
      config.data = data;
    }

    axios(config)
      .then((result: any) => {
        const { data } = result;
        return res(data);
      })
      .catch(error => {
        console.log("API Error:", error?.response?.data || error.message);
        return rej(error?.response?.data || { message: 'Network Error' });
      });
  });
}

export function apiGet(endPoint = '', data?: any, headers = {}, requestOptions?: any) {
  return apiReq(endPoint, data, 'get', headers, requestOptions);
}
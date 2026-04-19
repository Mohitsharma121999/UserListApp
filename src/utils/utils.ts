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
  data: any = {},
  method: Methods,
  headers: any = {},
  requestOptions = {},
) {
  return new Promise(async (res, rej) => {
    const getTokenHeader = await getHeaders();

    let finalHeaders = {
      ...getTokenHeader,
      ...headers,
    };

    const isFormData = data instanceof FormData;

    if (isFormData) {
      delete finalHeaders['Content-type'];
      delete finalHeaders['Content-Type'];
    }

    const config: any = {
      method,
      url: endPoint,
      headers: finalHeaders,
      data: data,
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    };

    if (method === 'get' || method === 'delete') {
      config.params = data;
    }

    axios(config)
      .then((result: any) => {
        res(result.data);
      })
      .catch(error => {
        console.log("Axios Detail Error:", error);
        rej(error?.response?.data || { message: 'Network Error' });
      });
  });
}

export function apiGet(endPoint = '', data?: any, headers = {}, requestOptions?: any) {
  return apiReq(endPoint, data, 'get', headers, requestOptions);
}

export function apiPost(endPoint = '', data?: any, headers = {}, requestOptions?: any) {
  console.log(endPoint, data, headers, requestOptions, 'API CALL');
  return apiReq(endPoint, data, 'post', headers, requestOptions);
}
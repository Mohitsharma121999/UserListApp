import * as urls from '../../config/urls';
import { apiPost } from '../../utils/utils';

import { changeAuth } from '../reducers/auth';
import { store } from '../store';

const { dispatch } = store;

export const saveUserData = (data: any) => {
  dispatch(changeAuth(data));
};


export async function listImages(data: any) {
  const formBody = Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
  return apiPost(urls.GET_DATA, formBody, {
    'Content-Type': 'application/x-www-form-urlencoded',
  });
}

export async function saveUserForm(data: any) {
  return apiPost(urls.SAVE_DATA, data); 
}
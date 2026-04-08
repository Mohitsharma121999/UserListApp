import * as urls from '../../config/urls';
import { apiGet,} from '../../utils/utils';
import { changeAuth } from '../reducers/auth';
import { store } from '../store';

const {dispatch} = store;
export const saveUserData = (data: any) => {
  dispatch(changeAuth(data));
};


export function listUsers(query) {

    console.log(query,'queryyyyyyyyyyyyyy')
  return apiGet(urls.userList + query);
}
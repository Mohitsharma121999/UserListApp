export const API_BASE_URL = 'https://dev3.xicomtechnologies.com/xttest/';

export const getApiUrl = (endpoint = '') => API_BASE_URL + endpoint;


export const GET_DATA = getApiUrl('getdata.php');
export const SAVE_DATA = getApiUrl('savedata.php');
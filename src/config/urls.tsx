export const API_BASE_URL = 'https://jsonplaceholder.typicode.com/';

export const getApiUrl = (endpoint = '') => API_BASE_URL + endpoint;

export const userList = getApiUrl('users');
import { BASE_URL, HEADERS } from './config';

const getResponseData = (res) => res.json()
  .then((json) => (res.ok ? json : Promise.reject(json)));

export const register = (email, password, name) => fetch(`${BASE_URL}/signup`, {
  method: 'POST',
  headers: HEADERS,
  body: JSON.stringify({ email, password, name }),
}).then((res) => getResponseData(res));

export const authorize = (email, password) => fetch(`${BASE_URL}/signin`, {
  method: 'POST',
  headers: HEADERS,
  body: JSON.stringify({ email, password }),
}).then((res) => getResponseData(res));

export const getContent = (token) => fetch(`${BASE_URL}/users/me`, {
  method: 'GET',
  headers: {
    HEADERS,
    Authorization: `Bearer ${token}`,
  },
}).then((res) => getResponseData(res));

import { BASE_URL, HEADERS } from './config';

class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Error: ${res.status}`));
  }

  getItems(label) {
    return fetch(this._baseUrl.concat(label), {
      method: 'GET',
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then((res) => this._getResponseData(res));
  }

  saveArticle(item) {
    return fetch(`${this._baseUrl}/articles`, {
      method: 'POST',
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify(item),
    }).then((res) => this._getResponseData(res));
  }

  deleteArticle(title, id) {
    return fetch(`${this._baseUrl}/articles/${id}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then((res) => this._getResponseData(res));
  }
}

const mainApi = new MainApi({
  baseUrl: BASE_URL,
  headers: HEADERS,
});

export default mainApi;

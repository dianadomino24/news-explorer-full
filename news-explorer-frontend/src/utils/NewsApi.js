import { newsApiConfig, DAYS_INTERVAL } from './config';

const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
const today = new Intl.DateTimeFormat(options).format(Date.now());
const interval = new Intl.DateTimeFormat(options).format(
  Date.now() - 24 * 60 * 60 * 1000 * DAYS_INTERVAL,
);

class NewsApi {
  constructor(newsConfig) {
    this._newsApiConfig = newsConfig;
    this._baseUrl = newsConfig.baseUrl;
    this._headers = newsConfig.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Error: ${res.status}`));
  }

  getArticles(keywords) {
    return fetch(`${this._baseUrl}everything?`
      + `q=${keywords}&`
      + `apiKey=${this._newsApiConfig.KEY}&`
      + `from=${today}&`
      + `to=${interval}&`
      + `pageSize=${this._newsApiConfig.PAGE_SIZE}`,
    {
      method: 'GET',
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }
}

const newsApi = new NewsApi(newsApiConfig);

export default newsApi;

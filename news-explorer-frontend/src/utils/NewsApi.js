import { newsApiConfig, DAYS_INTERVAL } from './config';

const locales = 'sv';
const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
const today = new Intl.DateTimeFormat(locales, options).format(Date.now());
const interval = new Intl.DateTimeFormat(locales, options).format(
  Date.now() - 24 * 60 * 60 * 1000 * DAYS_INTERVAL,
);

function getResponseData(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Error: ${res.status}`));
}
class NewsApi {
  constructor(newsConfig) {
    this._newsApiConfig = newsConfig;
    this._baseUrl = newsConfig.BASE_URL;
    this.getResponseData = getResponseData.bind(this);
  }

  getArticles(keyword) {
    return fetch(`${this._baseUrl}everything?`
      + `q=${keyword}&`
      + `apiKey=${this._newsApiConfig.KEY}&`
      + `from=${today}&`
      + `to=${interval}&`
      + `pageSize=${this._newsApiConfig.PAGE_SIZE}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }).then((res) => this.getResponseData(res));
  }
}

const newsApi = new NewsApi(newsApiConfig);

export default newsApi;

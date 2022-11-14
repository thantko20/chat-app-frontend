import mainAxios, { AxiosRequestConfig } from 'axios';
import storage from '../utils/storage';

const authRequestInterceptor = (config: AxiosRequestConfig) => {
  const token = storage.getToken();

  // config cannot be undefined but config.headers can be
  // https://stackoverflow.com/a/70123760
  config.headers = config.headers ?? {};

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  config.headers.accept = 'application/json';
  return config;
};

const axios = mainAxios.create({
  baseURL: 'http://localhost:5000',
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data.data;
  },
  (error) => {
    const message = error.response.data.message || 'Unknown Error';

    throw Error(message);
  },
);

export default axios;

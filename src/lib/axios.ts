import mainAxios from 'axios';

const axios = mainAxios.create({
  baseURL: 'http://localhost:5000',
});

export default axios;

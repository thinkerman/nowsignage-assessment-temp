import axios from 'axios';

// reusable hhtp request service with axios
const BASE_URL = 'https://cdn.nowsignage.com/challenge/items.json';
axios.defaults.baseURL = `${BASE_URL}`;

// here we can write interceptor functions when necessary for axios

export default {
  post: axios.post,
  get: axios.get,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};

import axios from 'axios';

const isDevelopment = import.meta.env.MODE === 'development';

const MyBaseUrl = isDevelopment
  ? import.meta.env.VITE_API_BASE_URL_LOCAL
  : import.meta.env.VITE_API_BASE_URL_DEPLOY;

const Axiosinstance = axios.create({
  baseURL: MyBaseUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default Axiosinstance;

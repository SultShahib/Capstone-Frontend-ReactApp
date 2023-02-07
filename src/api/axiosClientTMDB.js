import axios from 'axios';
import queryString from 'query-string';

import apiConfigTMDB from './apiConfigTMDB';

const axiosClientTMDB = axios.create({
  baseURL: apiConfigTMDB.baseUrl,
  //   baseURL: apiConfig.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) =>
    queryString.stringify({ ...params, api_key: apiConfigTMDB.apiKey }),
});

axiosClientTMDB.interceptors.request.use(async (config) => config);

axiosClientTMDB.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosClientTMDB;

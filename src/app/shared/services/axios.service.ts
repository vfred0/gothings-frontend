import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { LocalStorageKeys } from '@core/utils/local-storage-keys.ts';

export const axiosClient = (() => {
  return axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      Accept: 'application/json, text/plain, */*',
    },
  });
})();

axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use((response) => {
  if (response.status === 401) {
    localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
  }

  return response;
});

const request = async (options: AxiosRequestConfig) => {
  const onSuccess = (response: AxiosResponse) => {
    return response.data;
  };

  const onError = function(error: AxiosError) {
    const responseData = error.response?.data as { message?: string; code?: string; error?: string } | undefined;
    return Promise.reject({
      message: responseData?.message,
      code: responseData?.code,
      error: responseData?.error,
    });
  };

  return axiosClient(options).then(onSuccess).catch(onError);
};

export default request;
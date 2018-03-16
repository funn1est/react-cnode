import axios from 'axios';
import { notification } from 'antd';
import { BASE_URL } from './api';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 6000,
});

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errorText = response.data.msg;
  notification.error({
    message: '错误',
    description: errorText,
  });
  const error = new Error(errorText);
  error.name = response.status;
  error.response = response;
  throw error;
};

export const get = (url, params) => new Promise(((resolve, reject) => {
  instance.get(url, { params })
    .then(checkStatus)
    .then(resolve)
    .catch(reject);
}));

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
  const errorText = response.data.error_msg;
  notification.error({
    message: `请求错误 ${response.status}: ${response.config.url}`,
    description: errorText,
  });
  const error = new Error(errorText);
  error.name = response.status;
  error.response = response;
  throw error;
};

export const get = async (url, params) => {
  try {
    const res = await instance.get(url, { params });
    return checkStatus(res);
  } catch (e) {
    return checkStatus(e.response);
  }
};

export const post = async (url, params) => {
  try {
    const res = await instance.post(url, params);
    return checkStatus(res);
  } catch (e) {
    return checkStatus(e.response);
  }
};

import { notification } from 'antd';

export const success = (msg, description) =>
  notification.success({
    message: msg,
    description,
  });

export const info = (msg, description) =>
  notification.info({
    message: msg,
    description,
  });

export const warning = (msg, description) =>
  notification.warning({
    message: msg,
    description,
  });

export const error = (msg, description) =>
  notification.error({
    message: msg,
    description,
  });

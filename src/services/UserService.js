import { get, post } from './instance';
import { UserApi } from './api';

export const getUser = name => {
  return get(UserApi.user.replace(/:name/, name), {});
};

export const verifyAccessToken = token => {
  const params = { accesstoken: token };
  return post(UserApi.accessToken, params);
};

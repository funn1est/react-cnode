import { get } from './instance';
import { UserApi } from './api';

export const getUser = (name) => {
  return get(UserApi.user.replace(/:name/, name), {});
};

import { get, post } from './instance';
import { TopicCollectApi } from './api';

export const getUserCollect = (userName) => {
  return get(TopicCollectApi.userCollect.replace(/:name/, userName));
};

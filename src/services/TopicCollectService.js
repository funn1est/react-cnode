import { get, post } from './instance';
import { TopicCollectApi } from './api';

export const getUserCollect = ({ name } = {}) => {
  if (name === undefined) {
    throw new TypeError('missing params');
  }
  return get(TopicCollectApi.userCollect.replace(/:name/, name));
};

export const collectTopic = ({ token, id } = {}) => {
  if (token === undefined || id === undefined) {
    throw new TypeError('missing params');
  }
  const params = {
    accesstoken: token,
    topic_id: id,
  };
  return post(TopicCollectApi.collectTopic, params);
};

export const cancelTopic = ({ token, id } = {}) => {
  if (token === undefined || id === undefined) {
    throw new TypeError('missing params');
  }
  const params = {
    accesstoken: token,
    topic_id: id,
  };
  return post(TopicCollectApi.cancelCollect, params);
};

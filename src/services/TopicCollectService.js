import { get, post } from './instance';
import { TopicCollectApi } from './api';

/**
 * get user's Topic collect
 * get: /topic_collect/:name
 *
 * @param {string} name - username
 * @returns {Promise<*>}
 */
export const getUserCollect = name => {
  return get(TopicCollectApi.userCollect.replace(/:name/, name));
};

/**
 * collect a Topic
 * post: /topic_collect/collect
 *
 * @param {string} token - user token
 * @param {string} id - topic ID
 * @returns {Promise<*>}
 */
export const collectTopic = (token, id) => {
  const params = {
    accesstoken: token,
    topic_id: id,
  };
  return post(TopicCollectApi.collectTopic, params);
};

/**
 * cancel collect a Topic
 * post: /topic_collect/de_collect
 *
 * @param {string} token - user token
 * @param {string} id - topic ID
 * @returns {Promise<*>}
 */
export const cancelTopic = (token, id) => {
  const params = {
    accesstoken: token,
    topic_id: id,
  };
  return post(TopicCollectApi.cancelCollect, params);
};

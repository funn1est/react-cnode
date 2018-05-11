import { userUtils } from 'utils';
import { get, post } from './instance';
import { TopicsApi } from './api';

/**
 * get Topics info
 * get: /topics
 *
 * @param {string} tab - topics tab
 * @param {number} page - topics page
 * @param {number} limit - topics page size
 * @returns {Promise<*>}
 */
export const getTopics = (tab, page, limit) => {
  const params = {
    tab,
    page,
    limit,
    mdrender: 'true',
  };
  return get(TopicsApi.topics, params);
};

/**
 * post Topics or update Topics
 * post: /topics for post a new Topics
 * post: /topics/update for update Topics
 *
 * @param {string} title - Topics title
 * @param {string} tab - Topics tab
 * @param {string} content - Topics content
 * @param {string} [id] - if update Topics then add this id param
 * @returns {Promise<*>}
 */
export const postTopics = (title, tab, content, id) => {
  const isPost = id === undefined;
  const { token: accesstoken } = userUtils.getUser();
  const params = {
    accesstoken,
    title,
    tab,
    content,
  };
  if (isPost) {
    return post(TopicsApi.topics, params);
  } else {
    params.topic_id = id;
    return post(TopicsApi.topicsUpdate, params);
  }
};

/**
 * get Topic info
 * get: /topic/:id
 *
 * @param {string} id - topic ID
 * @param {string} token - user token
 * @returns {Promise<*>}
 */
export const getTopic = (id, token) => {
  const params = { accesstoken: token, mdrender: 'false' };
  return get(TopicsApi.topic.replace(/:id/, id), params);
};

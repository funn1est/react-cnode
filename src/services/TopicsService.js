import { userUtils } from 'utils';
import { get, post } from './instance';
import { TopicsApi } from './api';

export const getTopics = ({
  page = 1,
  tab = 'all',
  limit = 20,
  mdrender = 'false',
} = {}) => {
  const params = {
    page,
    tab,
    limit,
    mdrender,
  };
  return get(TopicsApi.topics, params);
};

export const postTopics = ({ id, title, tab, content } = {}) => {
  const isPost = id === undefined;
  if (title === undefined || tab === undefined || content === undefined) {
    throw new TypeError('missing params');
  }

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

export const getTopic = ({ id, accesstoken = '', mdrender = 'false' } = {}) => {
  if (id === undefined) {
    throw new TypeError('missing params');
  }
  const params = { mdrender, accesstoken };
  return get(TopicsApi.topic.replace(/:id/, id), params);
};

import { get } from './instance';
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

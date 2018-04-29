import { post } from './instance';
import { ReplyApi } from './api';

export const addReply = ({ token, topicId, content, replyId } = {}) => {
  if (token === undefined || topicId === undefined || content === undefined) {
    throw new TypeError('missing params');
  }

  const params = {
    accesstoken: token,
    content,
  };
  if (replyId !== undefined) {
    params.reply_id = replyId;
  }

  return post(ReplyApi.reply.replace(/:topic_id/, topicId), params);
};

export const upReply = () => {};

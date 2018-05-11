import { post } from './instance';
import { ReplyApi } from './api';

/**
 * add reply to Topic
 * post: /topic/:topic_id/replies
 *
 * @param {string} token - user token
 * @param {string} topicId - topic ID
 * @param {string} content - reply content
 * @param {string} [replyId] - if reply to another reply then add this param
 * @returns {Promise<*>}
 */
export const addReply = (token, topicId, content, replyId) => {
  const params = {
    accesstoken: token,
    content,
  };
  if (replyId !== undefined) {
    params.reply_id = replyId;
  }

  return post(ReplyApi.reply.replace(/:topic_id/, topicId), params);
};

/**
 * up for Topic's reply
 * post: /reply/:reply_id/ups
 *
 * @param {string} token - user token
 * @param {string} replyId - reply to up
 * @returns {Promise<*>}
 */
export const upReply = (token, replyId) => {
  const params = {
    accesstoken: token,
  };
  return post(ReplyApi.upReply.replace(/:reply_id/, replyId), params);
};

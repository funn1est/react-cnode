import sinon from 'sinon';
import * as services from 'services/instance';
import { ReplyApi } from 'services/api';
import { addReply } from '../ReplyService';

describe('addReply()', () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = sinon.stub(services.instance, 'post');
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('should add reply_id to params', async () => {
    const token = '321';
    const topicId = '123';
    const content = 'content';
    const replyId = '110';
    const spy = jest.spyOn(services, 'post');

    mockAxios
      .withArgs(ReplyApi.reply.replace(/:topic_id/, topicId))
      .resolves({ status: 200, data: { success: true } });

    await addReply(token, topicId, content, replyId);
    expect(spy).toHaveBeenLastCalledWith(
      ReplyApi.reply.replace(/:topic_id/, topicId),
      {
        accesstoken: token,
        content,
        reply_id: replyId,
      },
    );
  });
});

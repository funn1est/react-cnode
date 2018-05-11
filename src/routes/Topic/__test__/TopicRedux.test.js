import { fromJS, List, Map } from 'immutable';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import { instance } from 'services/instance';
import { TopicsApi, TopicCollectApi, ReplyApi } from 'services/api';
import reducer, {
  loadTopic,
  loadTopicSuccess,
  loadTopicError,
  postCollectTopic,
  postCollectTopicSuccess,
  postCollectTopicError,
  upTopicReply,
  upTopicReplySuccess,
  upTopicReplyError,
  getTopicData,
  collectTopic,
  upReply,
} from '../TopicRedux';

describe('TopicRedux reducer', () => {
  const initialState = Map({
    loading: false,
    loadingCollect: false,
    loadingUp: false,

    error: false,
    collectError: false,
    upError: false,

    topicData: Map({}),
    repliesData: Map({
      entities: Map({}),
      result: List([]),
    }),
    isCollect: false,
  });

  it('should return LOAD_TOPIC status', () => {
    const state = reducer(initialState, loadTopic());
    expect(state).toEqual(initialState.set('loading', true));
  });

  it('should return LOAD_TOPIC_SUCCESS status', () => {
    const payload = {
      topicData: fromJS({ id: 111 }),
      repliesData: fromJS({ entities: { '1': {} }, result: ['1'] }),
      isCollect: true,
    };
    const state = reducer(initialState, loadTopicSuccess(payload));
    expect(state).toEqual(
      initialState
        .set('topicData', payload.topicData)
        .set('repliesData', payload.repliesData)
        .set('isCollect', true),
    );
  });

  it('should return LOAD_TOPIC_ERROR status', () => {
    const state = reducer(initialState, loadTopicError());
    expect(state).toEqual(initialState.set('error', true));
  });

  it('should return POST_COLLECT_TOPIC status', () => {
    const state = reducer(initialState, postCollectTopic());
    expect(state).toEqual(initialState.set('loadingCollect', true));
  });

  it('should return POST_COLLECT_TOPIC_SUCCESS status', () => {
    const state = reducer(initialState, postCollectTopicSuccess());
    expect(state).toEqual(initialState.set('isCollect', true));
  });

  it('should return POST_COLLECT_TOPIC_ERROR status', () => {
    const state = reducer(initialState, postCollectTopicError());
    expect(state).toEqual(initialState.set('collectError', true));
  });

  it('should return UP_TOPIC_REPLY status', () => {
    const state = reducer(initialState, upTopicReply());
    expect(state).toEqual(initialState.set('loadingUp', true));
  });

  it('should return UP_TOPIC_REPLY_SUCCESS status', () => {
    const ownInitialState = initialState.setIn(
      ['repliesData', 'entities'],
      fromJS({
        '233': {
          is_uped: false,
          ups: 15,
        },
      }),
    );
    const state = reducer(
      ownInitialState,
      upTopicReplySuccess({ replyId: '233', isUp: true }),
    );
    expect(state).toEqual(
      ownInitialState
        .setIn(['repliesData', 'entities', '233', 'is_uped'], true)
        .setIn(['repliesData', 'entities', '233', 'ups'], 16),
    );
  });

  it('should return UP_TOPIC_REPLY_ERROR status', () => {
    const state = reducer(initialState, upTopicReplyError());
    expect(state).toEqual(initialState.set('upError', true));
  });
});

describe('TopicRedux actions', () => {
  const callback = jest.fn();
  const token = '321';
  const topicId = '007';
  const replyId = '008';
  const middleware = [thunk];
  const store = configureStore(middleware)();
  let mockAxiosGet;
  let mockAxiosPost;

  beforeEach(() => {
    mockAxiosGet = sinon.stub(instance, 'get');
    mockAxiosPost = sinon.stub(instance, 'post');
  });

  afterEach(() => {
    mockAxiosGet.restore();
    mockAxiosPost.restore();
    store.clearActions();
  });

  it('getTopicData() success', async () => {
    const mockData = {
      id: '123',
      replies: [{ id: '1', ups: [] }],
      is_collect: false,
    };
    const mockTopicData = Map({ id: '123' });
    const mockRepliesData = Map({
      result: List(['1']),
      entities: fromJS({
        '1': { id: '1', ups: 0 },
      }),
    });
    mockAxiosGet
      .withArgs(TopicsApi.topic.replace(/:id/, topicId))
      .resolves({ status: 200, data: { data: { ...mockData } } });

    const expectedActions = [
      loadTopic(),
      loadTopicSuccess({
        topicData: mockTopicData,
        repliesData: mockRepliesData,
        isCollect: false,
      }),
    ];
    await store.dispatch(getTopicData(topicId, token, callback)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('getTopicData() error', async () => {
    mockAxiosGet.withArgs(TopicsApi.topic.replace(/:id/, topicId)).rejects();

    const expectedActions = [loadTopic(), loadTopicError()];
    await store.dispatch(getTopicData(topicId, token, callback)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('collectTopic() collect success', async () => {
    mockAxiosPost
      .withArgs(TopicCollectApi.collectTopic)
      .resolves({ status: 200, data: { success: true } });

    const expectedActions = [postCollectTopic(), postCollectTopicSuccess()];
    await store.dispatch(collectTopic(true, token, topicId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('collectTopic() cancel success', async () => {
    mockAxiosPost
      .withArgs(TopicCollectApi.cancelCollect)
      .resolves({ status: 200, data: { success: true } });

    const expectedActions = [postCollectTopic(), postCollectTopicSuccess()];
    await store.dispatch(collectTopic(false, token, topicId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('collectTopic() service return success: false', async () => {
    mockAxiosPost
      .withArgs(TopicCollectApi.collectTopic)
      .resolves({ status: 200, data: { success: false } });

    const expectedActions = [postCollectTopic(), postCollectTopicError()];
    await store.dispatch(collectTopic(true, token, topicId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('collectTopic() service error reject', async () => {
    mockAxiosPost.withArgs(TopicCollectApi.cancelCollect).rejects();

    const expectedActions = [postCollectTopic(), postCollectTopicError()];
    await store.dispatch(collectTopic(true, token, topicId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('upReply() success', async () => {
    mockAxiosPost
      .withArgs(ReplyApi.upReply.replace(/:reply_id/, replyId))
      .resolves({ status: 200, data: { success: true, action: 'up' } });

    const expectedActions = [
      upTopicReply(),
      upTopicReplySuccess({ replyId, isUp: true }),
    ];
    await store.dispatch(upReply(token, replyId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('upReply() service return succss: false', async () => {
    mockAxiosPost
      .withArgs(ReplyApi.upReply.replace(/:reply_id/, replyId))
      .resolves({ status: 200, data: { success: false } });

    const expectedActions = [upTopicReply(), upTopicReplyError()];
    await store.dispatch(upReply(token, replyId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('upReply() service reject', async () => {
    mockAxiosPost
      .withArgs(ReplyApi.upReply.replace(/:reply_id/, replyId))
      .rejects();

    const expectedActions = [upTopicReply(), upTopicReplyError()];
    await store.dispatch(upReply(token, replyId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

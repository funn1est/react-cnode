import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { TopicsService, TopicCollectService, ReplyService } from 'services';

const LOAD_TOPIC = 'routes/Topic/LOAD_TOPIC';
const LOAD_TOPIC_SUCCESS = 'routes/Topic/LOAD_TOPIC_SUCCESS';
const LOAD_TOPIC_ERROR = 'routes/Topic/LOAD_TOPIC_ERROR';

const POST_COLLECT_TOPIC = 'routes/Topic/POST_COLLECT_TOPIC';
const POST_COLLECT_TOPIC_SUCCESS = 'routes/Topic/POST_COLLECT_TOPIC_SUCCESS';
const POST_COLLECT_TOPIC_ERROR = 'routes/Topic/POST_COLLECT_TOPIC_ERROR';

const UP_TOPIC_REPLY = 'routes/Topic/UP_TOPIC_REPLY';
const UP_TOPIC_REPLY_SUCCESS = 'routes/Topic/UP_TOPIC_REPLY_SUCCESS';
const UP_TOPIC_REPLY_ERROR = 'routes/Topic/UP_TOPIC_REPLY_ERROR';

const initialState = Map({
  loading: false,
  loadingCollect: false,
  loadingUp: false,

  error: false,
  collectError: false,
  upError: false,

  topicData: {},
});

const loadTopic = createAction(LOAD_TOPIC);
const loadTopicSuccess = createAction(LOAD_TOPIC_SUCCESS);
const loadTopicError = createAction(LOAD_TOPIC_ERROR);

const postCollectTopic = createAction(POST_COLLECT_TOPIC);
const postCollectTopicSuccess = createAction(POST_COLLECT_TOPIC_SUCCESS);
const postCollectTopicError = createAction(POST_COLLECT_TOPIC_ERROR);

const upTopicReply = createAction(UP_TOPIC_REPLY);
const upTopicReplySuccess = createAction(UP_TOPIC_REPLY_SUCCESS);
const upTopicReplyError = createAction(UP_TOPIC_REPLY_ERROR);

export const getTopicData = (id, token, callback) => async dispatch => {
  dispatch(loadTopic());
  try {
    const {
      data: { data },
    } = await TopicsService.getTopic({ id, accesstoken: token });
    const formatData = {
      ...data,
      replies: data.replies.map(item => ({
        ...item,
        ups: item.ups.length,
      })),
    };
    dispatch(loadTopicSuccess(formatData));
    callback(formatData);
  } catch (e) {
    dispatch(loadTopicError());
  }
};

/**
 * topic collect
 * @param {bool} isCollect - true: collect topic, false: cancel collect topic
 * @param {string} token
 * @param {string} id
 * @returns {Function}
 */
export const collectTopic = (isCollect, token, id) => async dispatch => {
  dispatch(postCollectTopic());
  try {
    let data;
    if (isCollect) {
      data = await TopicCollectService.collectTopic({ token, id });
    } else {
      data = await TopicCollectService.cancelTopic({ token, id });
    }
    const {
      data: { success },
    } = data;
    if (success) {
      dispatch(postCollectTopicSuccess());
    } else {
      dispatch(postCollectTopicError());
    }
  } catch (e) {
    console.log(e);
    dispatch(postCollectTopicError());
  }
};

export const upReply = (token, replyId, itemKey) => async dispatch => {
  dispatch(upTopicReply());
  try {
    const {
      data: { success, action },
    } = await ReplyService.upReply({ token, replyId });
    if (success) {
      dispatch(upTopicReplySuccess({ key: itemKey, isUp: action === 'up' }));
    }
  } catch (e) {
    dispatch(upTopicReplyError());
  }
};

const reducer = handleActions(
  {
    [LOAD_TOPIC]: state =>
      state
        .set('loading', true)
        .set('error', false)
        .set('topicData', {}),

    [LOAD_TOPIC_SUCCESS]: (state, { payload }) =>
      state.set('loading', false).set('topicData', payload),

    [LOAD_TOPIC_ERROR]: state => state.set('loading', false).set('error', true),

    [POST_COLLECT_TOPIC]: state =>
      state.set('loadingCollect', true).set('collectError', false),

    [POST_COLLECT_TOPIC_SUCCESS]: state => {
      const topicData = state.get('topicData');
      return state.set('loadingCollect', false).set('topicData', {
        ...topicData,
        is_collect: !topicData.is_collect,
      });
      // .updateIn(['topicData', 'is_collect'], value => value)
    },

    [POST_COLLECT_TOPIC_ERROR]: state =>
      state.set('loadingCollect', false).set('collectError', true),

    [UP_TOPIC_REPLY]: state =>
      state.set('loadingUp', true).set('upError', false),

    [UP_TOPIC_REPLY_SUCCESS]: (state, { payload: { key, isUp } }) => {
      const topicData = state.get('topicData');
      const { replies } = topicData;
      const { is_uped, ups } = replies[key];
      replies.splice(key, 1, {
        ...replies[key],
        ups: isUp ? ups + 1 : ups - 1,
        is_uped: !is_uped,
      });
      return state.set('loadingUp', false).set('topicData', {
        ...topicData,
        replies,
      });
    },

    [UP_TOPIC_REPLY_ERROR]: state =>
      state.set('loadingUp', false).set('upError', true),
  },
  initialState,
);

export default reducer;

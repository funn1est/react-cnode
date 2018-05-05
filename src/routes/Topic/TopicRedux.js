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

const initialState = {
  loading: false,
  topicData: {},
  error: false,

  loadingCollect: false,
  collectError: false,

  loadingUp: false,
  upError: false,
};

const loadTopic = createAction(LOAD_TOPIC);
const loadTopicSuccess = createAction(
  LOAD_TOPIC_SUCCESS,
  payload => payload,
);
const loadTopicError = createAction(LOAD_TOPIC_ERROR);

const postCollectTopic = createAction(POST_COLLECT_TOPIC);
const postCollectTopicSuccess = createAction(POST_COLLECT_TOPIC_SUCCESS);
const postCollectTopicError = createAction(POST_COLLECT_TOPIC_ERROR);

const upTopicReply = createAction(UP_TOPIC_REPLY);
const upTopicReplySuccess = createAction(
  UP_TOPIC_REPLY_SUCCESS,
  payload => payload,
);
const upTopicReplyError = createAction(UP_TOPIC_REPLY_ERROR);

export const getTopicData = (id, token, callback) => async (dispatch) => {
  dispatch(loadTopic());
  try {
    const { data: { data } } =
      await TopicsService.getTopic({ id, accesstoken: token });
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
export const collectTopic = (isCollect, token, id) => async (dispatch) => {
  dispatch(postCollectTopic());
  try {
    let data;
    if (isCollect) {
      data = await TopicCollectService.collectTopic({ token, id });
    } else {
      data = await TopicCollectService.cancelTopic({ token, id });
    }
    const { data: { success } } = data;
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

export const upReply = (token, replyId, itemKey) => async (dispatch) => {
  dispatch(upTopicReply());
  try {
    const { data: { success, action } } =
      await ReplyService.upReply({ token, replyId });
    if (success) {
      dispatch(upTopicReplySuccess({ key: itemKey, isUp: action === 'up' }));
    }
  } catch (e) {
    dispatch(upTopicReplyError());
  }
};

const reducer = handleActions({
  [LOAD_TOPIC]: state => ({
    ...state,
    topicData: {},
    loading: true,
    error: false,
  }),

  [LOAD_TOPIC_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: false,
    topicData: action.payload,
  }),

  [LOAD_TOPIC_ERROR]: state => ({
    ...state,
    topicData: {},
    loading: false,
    error: true,
  }),

  [POST_COLLECT_TOPIC]: state => ({
    ...state,
    loadingCollect: true,
    collectError: false,
  }),

  [POST_COLLECT_TOPIC_SUCCESS]: state => ({
    ...state,
    loadingCollect: false,
    topicData: {
      ...state.topicData,
      is_collect: !state.topicData.is_collect,
    },
  }),

  [POST_COLLECT_TOPIC_ERROR]: state => ({
    ...state,
    loadingCollect: false,
    collectError: true,
  }),

  [UP_TOPIC_REPLY]: state => ({
    ...state,
    loadingUp: true,
    upError: false,
  }),

  [UP_TOPIC_REPLY_SUCCESS]: (state, action) => {
    const { key, isUp } = action.payload;
    const { topicData: { replies } } = state;
    const { is_uped, ups } = replies[key];
    replies.splice(key, 1, {
      ...replies[key],
      ups: isUp ? ups + 1 : ups - 1,
      is_uped: !is_uped,
    });
    return {
      ...state,
      loadingUp: false,
      topicData: {
        ...state.topicData,
        replies,
      },
    };
  },

  [UP_TOPIC_REPLY_ERROR]: state => ({
    ...state,
    loadingUp: false,
    upError: true,
  }),
}, initialState);

export default reducer;

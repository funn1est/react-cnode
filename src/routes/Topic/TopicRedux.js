import { createAction, handleActions } from 'redux-actions';
import { TopicsService, TopicCollectService } from 'services';

const LOAD_TOPIC = 'routes/Topic/LOAD_TOPIC';
const LOAD_TOPIC_SUCCESS = 'routes/Topic/LOAD_TOPIC_SUCCESS';
const LOAD_TOPIC_ERROR = 'routes/Topic/LOAD_TOPIC_ERROR';

const POST_COLLECT_TOPIC = 'routes/Topic/POST_COLLECT_TOPIC';
const POST_COLLECT_TOPIC_SUCCESS = 'routes/Topic/POST_COLLECT_TOPIC_SUCCESS';
const POST_COLLECT_TOPIC_ERROR = 'routes/Topic/POST_COLLECT_TOPIC_ERROR';

const initialState = {
  loading: false,
  topicData: {},
  error: false,

  loadingCollect: false,
  collectError: false,
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

export const getTopicData = (id, token, callback) => async (dispatch) => {
  dispatch(loadTopic());
  try {
    const { data: { data } } =
      await TopicsService.getTopic({ id, accesstoken: token });
    dispatch(loadTopicSuccess(data));
    callback(data);
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
}, initialState);

export default reducer;

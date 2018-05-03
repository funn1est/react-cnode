import { createAction, handleActions } from 'redux-actions';
import { TopicsService } from 'services';

const LOAD_TOPIC = 'routes/Topic/LOAD_TOPIC';
const LOAD_TOPIC_SUCCESS = 'routes/Topic/LOAD_TOPIC_SUCCESS';
const LOAD_TOPIC_ERROR = 'routes/Topic/LOAD_TOPIC_ERROR';

const initialState = {
  loading: false,
  topicData: {},
  error: false,
};

const loadTopic = createAction(LOAD_TOPIC);
const loadTopicSuccess = createAction(
  LOAD_TOPIC_SUCCESS,
  response => response,
);
const loadTopicError = createAction(LOAD_TOPIC_ERROR);

export const getTopicData = (id, callback) => async (dispatch) => {
  dispatch(loadTopic());
  try {
    const { data: { data } } =
      await TopicsService.getTopic(id, { mdrender: 'false' });
    dispatch(loadTopicSuccess(data));
    callback(data);
  } catch (e) {
    dispatch(loadTopicError());
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
}, initialState);

export default reducer;

import { createAction, handleActions } from 'redux-actions';
import { TopicsService } from 'services';

const LOAD_TOPICS = 'routes/Home/LOAD_TOPICS';
const LOAD_TOPICS_SUCCESS = 'routes/Home/LOAD_TOPICS_SUCCESS';
const LOAD_TOPICS_ERROR = 'routes/Home/LOAD_TOPICS_ERROR';

const initialState = {
  loading: false,
  topicsData: [],
  error: false,
};

const loadTopics = createAction(LOAD_TOPICS);
const loadTopicsSuccess = createAction(
  LOAD_TOPICS_SUCCESS,
  response => response,
);
const loadTopicsError = createAction(LOAD_TOPICS_ERROR);

export const getTopicsData = tab => (dispatch) => {
  dispatch(loadTopics());
  TopicsService.getTopics({
    tab,
    page: 1,
    limit: 20,
    mdrender: 'true',
  })
    .then(({ data: { data } }) => {
      dispatch(loadTopicsSuccess(data));
    })
    .catch(() => {
      dispatch(loadTopicsError());
    });
};

const reducer = handleActions({
  [LOAD_TOPICS]: state => ({
    ...state,
    loading: true,
  }),

  [LOAD_TOPICS_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: false,
    topicsData: action.payload,
  }),

  [LOAD_TOPICS_ERROR]: state => ({
    ...state,
    loading: false,
    error: true,
  }),
}, initialState);

export default reducer;

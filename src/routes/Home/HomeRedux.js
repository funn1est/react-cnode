import { createAction, handleActions } from 'redux-actions';
import { TopicsService } from 'services';

const LOAD_TOPICS = 'routes/Home/LOAD_TOPICS';
const LOAD_TOPICS_SUCCESS = 'routes/Home/LOAD_TOPICS_SUCCESS';
const LOAD_TOPICS_ERROR = 'routes/Home/LOAD_TOPICS_ERROR';

const LOAD_MORE_TOPICS = 'routes/Home/LOAD_MORE_TOPICS';
const LOAD_MORE_TOPICS_SUCCESS = 'routes/Home/LOAD_MORE_TOPICS_SUCCESS';
const LOAD_MORE_TOPICS_ERROR = 'routes/Home/LOAD_MORE_TOPICS_ERROR';

const LOAD_TOPICS_FINISH = 'routes/Home/LOAD_TOPICS_FINISH';

const PAGE_SIZE = 10;

const initialState = {
  loading: false,
  loadingMore: false,
  hasMore: true,
  topicsData: [],
  error: false,
};

const loadTopics = createAction(LOAD_TOPICS);
const loadTopicsSuccess = createAction(
  LOAD_TOPICS_SUCCESS,
  payload => payload,
);
const loadTopicsError = createAction(LOAD_TOPICS_ERROR);

const loadMoreTopics = createAction(LOAD_MORE_TOPICS);
const loadMoreTopicsSuccess = createAction(
  LOAD_MORE_TOPICS_SUCCESS,
  payload => payload,
);
const loadMoreTopicsError = createAction(LOAD_MORE_TOPICS_ERROR);

const loadTopicsFinish = createAction(LOAD_TOPICS_FINISH);

export const getTopicsData = (tab, page, callback) => async (dispatch) => {
  dispatch(loadTopics());
  try {
    const { data: { data } } =
      await TopicsService.getTopics({
        tab,
        page,
        limit: PAGE_SIZE,
        mdrender: 'true',
      });
    dispatch(loadTopicsSuccess(data));
    if (data.length < PAGE_SIZE) {
      dispatch(loadTopicsFinish());
    }
    callback();
  } catch (e) {
    dispatch(loadTopicsError());
  }
};

export const getMoreTopicsData = (tab, page, callback) => async (dispatch) => {
  dispatch(loadMoreTopics());
  try {
    const { data: { data } } =
      await TopicsService.getTopics({
        tab,
        page,
        limit: PAGE_SIZE,
        mdrender: 'true',
      });
    dispatch(loadMoreTopicsSuccess(data));
    if (data.length < PAGE_SIZE) {
      dispatch(loadTopicsFinish());
    }
    callback();
  } catch (e) {
    dispatch(loadMoreTopicsError());
  }
};

const reducer = handleActions({
  [LOAD_TOPICS]: state => ({
    ...state,
    topicsData: [],
    loading: true,
    hasMore: true,
    error: false,
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

  [LOAD_MORE_TOPICS]: state => ({
    ...state,
    loadingMore: true,
    error: false,
  }),

  [LOAD_MORE_TOPICS_SUCCESS]: (state, action) => ({
    ...state,
    loadingMore: false,
    error: false,
    topicsData: [...state.topicsData, ...action.payload],
  }),

  [LOAD_MORE_TOPICS_ERROR]: state => ({
    ...state,
    loadingMore: false,
    error: true,
  }),

  [LOAD_TOPICS_FINISH]: state => ({
    ...state,
    hasMore: false,
  }),
}, initialState);

export default reducer;

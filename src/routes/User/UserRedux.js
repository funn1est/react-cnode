import { UserService, TopicCollectService } from 'services';
import { createAction, handleActions } from 'redux-actions';

const LOAD_USER = 'routes/User/LOAD_USER';
const LOAD_USER_SUCCESS = 'routes/User/LOAD_USER_SUCCESS';
const LOAD_USER_ERROR = 'routes/User/LOAD_USER_ERROR';

const initialState = {
  loading: false,
  userData: {},
  error: false,
};

const loadUser = createAction(LOAD_USER);
const loadUserSuccess = createAction(
  LOAD_USER_SUCCESS,
  response => response,
);
const loadUserError = createAction(LOAD_USER_ERROR);

export const getUserData = name => async (dispatch) => {
  dispatch(loadUser());
  try {
    const { data: { data } } =
      await UserService.getUser(name);
    const { data: { data: collectData } } =
      await TopicCollectService.getUserCollect({ name });
    data.collect = collectData;
    dispatch(loadUserSuccess(data));
  } catch (e) {
    dispatch(loadUserError());
  }
};

const reducer = handleActions({
  [LOAD_USER]: state => ({
    ...state,
    loading: true,
    userData: {},
    error: false,
  }),

  [LOAD_USER_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: false,
    userData: action.payload,
  }),

  [LOAD_USER_ERROR]: state => ({
    ...state,
    loading: false,
    error: true,
  }),
}, initialState);

export default reducer;

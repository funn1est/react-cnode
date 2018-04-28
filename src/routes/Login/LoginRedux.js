import { createAction, handleActions } from 'redux-actions';
import { UserService } from 'services';
import { toastUtils, userUtils } from 'utils';

const POST_ACCESS_TOKEN = 'routes/Login/POST_ACCESS_TOKEN';
const POST_ACCESS_TOKEN_SUCCESS = 'routes/Login/POST_ACCESS_TOKEN_SUCCESS';
const POST_ACCESS_TOKEN_ERROR = 'routes/Login/POST_ACCESS_TOKEN_ERROR';
const POST_LOGOUT = 'routes/Login/POST_LOGOUT';

const initialState = {
  loading: false,
  userData: {},
  error: false,
};

const postAccessToken = createAction(POST_ACCESS_TOKEN);
const postAccessTokenSuccess = createAction(
  POST_ACCESS_TOKEN_SUCCESS,
  response => response,
);
const postAccessTokenError = createAction(POST_ACCESS_TOKEN_ERROR);
const postLogout = createAction(POST_LOGOUT);

export const login = (token, remember, callback) => async (dispatch) => {
  dispatch(postAccessToken());
  try {
    const { data } = await UserService.verifyAccessToken(token);
    const user = {
      name: data.loginname,
      avatar: data.avatar_url,
      id: data.id,
      token,
    };
    if (remember) {
      userUtils.saveUserLocal(user);
    } else {
      userUtils.saveUserSession(user);
    }
    toastUtils.success('登录成功');
    callback();
    dispatch(postAccessTokenSuccess(user));
  } catch (e) {
    dispatch(postAccessTokenError());
  }
};

export const logout = () => (dispatch) => {
  userUtils.removeUser();
  dispatch(postLogout());
};

const reducer = handleActions({
  [POST_ACCESS_TOKEN]: state => ({
    ...state,
    loading: true,
  }),

  [POST_ACCESS_TOKEN_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: false,
    userData: action.payload,
  }),

  [POST_ACCESS_TOKEN_ERROR]: state => ({
    ...state,
    loading: false,
    error: true,
  }),

  [POST_LOGOUT]: state => ({
    ...state,
    userData: {},
  }),
}, initialState);

export default reducer;

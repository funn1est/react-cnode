import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { UserService } from 'services';
import { toastUtils, userUtils } from 'utils';

const POST_ACCESS_TOKEN = 'routes/Login/POST_ACCESS_TOKEN';
const POST_ACCESS_TOKEN_SUCCESS = 'routes/Login/POST_ACCESS_TOKEN_SUCCESS';
const POST_ACCESS_TOKEN_ERROR = 'routes/Login/POST_ACCESS_TOKEN_ERROR';
const POST_LOGOUT = 'routes/Login/POST_LOGOUT';
const GET_USER = 'routes/Login/GET_USER';

const initialState = Map({
  loading: false,
  userData: {},
  error: false,
});

const postAccessToken = createAction(POST_ACCESS_TOKEN);
const postAccessTokenSuccess = createAction(POST_ACCESS_TOKEN_SUCCESS);
const postAccessTokenError = createAction(POST_ACCESS_TOKEN_ERROR);
const postLogout = createAction(POST_LOGOUT);
const getUser = createAction(GET_USER);

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
    dispatch(postAccessTokenSuccess(user));
    callback();
  } catch (e) {
    dispatch(postAccessTokenError());
  }
};

export const logout = () => (dispatch) => {
  userUtils.removeUser();
  dispatch(postLogout());
};

export const getCurrentUser = () => (dispatch) => {
  const user = userUtils.getUser() || {};
  dispatch(getUser(user));
};

const reducer = handleActions({
  [POST_ACCESS_TOKEN]: state => (
    state
      .set('loading', true)
      .set('error', false)
      .set('userData', {})
  ),

  [POST_ACCESS_TOKEN_SUCCESS]: (state, { payload }) => (
    state
      .set('loading', false)
      .set('userData', payload)
  ),

  [POST_ACCESS_TOKEN_ERROR]: state => (
    state
      .set('loading', false)
      .error('error', true)
  ),

  [POST_LOGOUT]: state => state.set('userData', {}),

  [GET_USER]: (state, { payload }) => state.set('userData', payload),
}, initialState);

export default reducer;

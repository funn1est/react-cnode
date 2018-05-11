import { Map } from 'immutable';
import { UserService, TopicCollectService } from 'services';
import { createAction, handleActions } from 'redux-actions';

const LOAD_USER = 'routes/User/LOAD_USER';
const LOAD_USER_SUCCESS = 'routes/User/LOAD_USER_SUCCESS';
const LOAD_USER_ERROR = 'routes/User/LOAD_USER_ERROR';

const initialState = Map({
  loading: false,
  userData: {},
  error: false,
});

const reducer = handleActions(
  {
    [LOAD_USER]: state =>
      state
        .set('loading', true)
        .set('error', false)
        .set('userData', {}),

    [LOAD_USER_SUCCESS]: (state, { payload }) =>
      state.set('loading', false).set('userData', payload),

    [LOAD_USER_ERROR]: state => state.set('loading', false).set('error', true),
  },
  initialState,
);

export const loadUser = createAction(LOAD_USER);
export const loadUserSuccess = createAction(LOAD_USER_SUCCESS);
export const loadUserError = createAction(LOAD_USER_ERROR);

export const getUserData = name => async dispatch => {
  dispatch(loadUser());
  try {
    const {
      data: { data },
    } = await UserService.getUser(name);
    const {
      data: { data: collectData },
    } = await TopicCollectService.getUserCollect(name);
    data.collect = collectData;
    dispatch(loadUserSuccess(data));
  } catch (e) {
    dispatch(loadUserError());
  }
};

export default reducer;

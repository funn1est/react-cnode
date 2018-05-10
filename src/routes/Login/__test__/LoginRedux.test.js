import { Map } from 'immutable';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import { instance } from 'services/instance';
import { UserApi } from 'services/api';
import reducer, {
  postAccessToken,
  postAccessTokenSuccess,
  postAccessTokenError,
  postLogout,
  getUser,
  login,
  logout,
  getCurrentUser,
} from '../LoginRedux';

describe('LoginRedux reducer', () => {
  const initialState = Map({
    loading: false,
    userData: {},
    error: false,
  });

  it('should return POST_ACCESS_TOKEN status', () => {
    const state = reducer(initialState, postAccessToken());
    expect(state).toEqual(initialState.set('loading', true));
  });

  it('should return POST_ACCESS_TOKEN_SUCCESS status', () => {
    const state = reducer(initialState, postAccessTokenSuccess({ user: 1 }));
    expect(state).toEqual(initialState.set('userData', { user: 1 }));
  });

  it('should return POST_ACCESS_TOKEN_ERROR status', () => {
    const state = reducer(initialState, postAccessTokenError());
    expect(state).toEqual(initialState.set('error', true));
  });

  it('should return POST_LOGOUT status', () => {
    const state = reducer(initialState, postLogout());
    expect(state).toEqual(initialState);
  });

  it('should return GET_USER status', () => {
    const state = reducer(initialState, getUser({ user: 1 }));
    expect(state).toEqual(initialState.set('userData', { user: 1 }));
  });
});

describe('LoginRedux actions', () => {
  const middleware = [thunk];
  const store = configureStore(middleware)();
  let mockAxios;

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    mockAxios = sinon.stub(instance, 'post');
  });

  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  });

  it('login() success', async () => {
    const token = '123';
    const user = { loginname: 'admin', avatar_url: '//', id: '007' };
    const userSave = { name: 'admin', avatar: '//', id: '007', token };
    const callback = jest.fn();
    mockAxios.withArgs(UserApi.accessToken).resolves({
      status: 200,
      data: user,
    });

    const expectedActions = [
      postAccessToken(),
      postAccessTokenSuccess(userSave),
    ];
    await store.dispatch(login(token, true, callback)).then(() => {
      // eslint-disable-next-line no-underscore-dangle
      expect(localStorage.__STORE__).toEqual({
        user: JSON.stringify(userSave),
      });
      expect(store.getActions()).toEqual(expectedActions);
    });

    await store.dispatch(login(token, false, callback)).then(() => {
      // eslint-disable-next-line no-underscore-dangle
      expect(sessionStorage.__STORE__).toEqual({
        user: JSON.stringify(userSave),
      });
    });
  });

  it('login() error', async () => {
    const token = '123';
    const callback = jest.fn();
    mockAxios.withArgs(UserApi.accessToken).rejects();

    const expectedActions = [postAccessToken(), postAccessTokenError()];
    await store.dispatch(login(token, false, callback)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('logout() should dispatch POST_LOGOUT', () => {
    const expectedActions = [postLogout()];
    store.dispatch(logout());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('getUser() should dispatch GET_USER', () => {
    const user = { name: 'admin' };
    const expectedActions1 = [getUser({})];
    const expectedActions2 = [getUser(user)];

    store.dispatch(getCurrentUser());
    expect(store.getActions()).toEqual(expectedActions1);
    store.clearActions();

    localStorage.setItem('user', JSON.stringify(user));
    store.dispatch(getCurrentUser());
    expect(store.getActions()).toEqual(expectedActions2);
  });
});

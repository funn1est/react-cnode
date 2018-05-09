import { Map } from 'immutable';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import { instance } from 'services/instance';
import { UserApi, TopicCollectApi } from 'services/api';
import reducer, {
  loadUser,
  loadUserSuccess,
  loadUserError,
  getUserData,
} from '../UserRedux';

describe('UserRedux reducer', () => {
  const initialState = Map({
    loading: false,
    userData: {},
    error: false,
  });

  it('should return LOAD_USER status', () => {
    const state = reducer(initialState, loadUser());
    expect(state).toEqual(initialState.set('loading', true));
  });

  it('should return LOAD_USER_SUCCESS status', () => {
    const state = reducer(initialState, loadUserSuccess({ user: 1 }));
    expect(state).toEqual(initialState.set('userData', { user: 1 }));
  });

  it('should return LOAD_USER_ERROR status', () => {
    const state = reducer(initialState, loadUserError());
    expect(state).toEqual(initialState.set('error', true));
  });
});

describe('UserRedux actions', () => {
  const middleware = [thunk];
  const store = configureStore(middleware)();
  const username = 'admin';
  let mockAxios;

  beforeEach(() => {
    mockAxios = sinon.stub(instance, 'get');
  });

  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  });

  it('getUserData() success', async () => {
    mockAxios
      .withArgs(UserApi.user.replace(/:name/, username))
      .resolves({ status: 200, data: { data: { id: 1 } } })
      .withArgs(TopicCollectApi.userCollect.replace(/:name/, username))
      .resolves({ status: 200, data: { data: true } });

    const expectedActions = [
      loadUser(),
      loadUserSuccess({ id: 1, collect: true }),
    ];
    await store.dispatch(getUserData(username)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('getUserData() error', async () => {
    mockAxios.withArgs(UserApi.user.replace(/:name/, username)).rejects();

    const expectedActions = [loadUser(), loadUserError()];
    await store.dispatch(getUserData(username)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

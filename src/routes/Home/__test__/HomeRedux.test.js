import { Map } from 'immutable';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import { instance } from 'services/instance';
import { TopicsApi } from 'services/api';
import reducer, {
  loadTopics,
  loadTopicsSuccess,
  loadTopicsError,
  loadMoreTopics,
  loadMoreTopicsSuccess,
  loadMoreTopicsError,
  loadTopicsFinish,
  getTopicsData,
  getMoreTopicsData,
} from '../HomeRedux';

describe('HomeRedux reducer', () => {
  const initialState = Map({
    loading: false,
    loadingMore: false,
    hasMore: true,
    error: false,
    topicsData: [],
  });

  it('should return LOAD_TOPICS status', () => {
    const state = reducer(initialState, loadTopics());
    expect(state).toEqual(initialState.set('loading', true));
  });

  it('should return LOAD_TOPICS_SUCCESS status', () => {
    const state = reducer(initialState, loadTopicsSuccess([{ topics: 1 }]));
    expect(state).toEqual(initialState.set('topicsData', [{ topics: 1 }]));
  });

  it('should return LOAD_TOPICS_ERROR status', () => {
    const state = reducer(initialState, loadTopicsError());
    expect(state).toEqual(initialState.set('error', true));
  });

  it('should return LOAD_MORE_TOPICS status', () => {
    const state = reducer(initialState, loadMoreTopics());
    expect(state).toEqual(initialState.set('loadingMore', true));
  });

  it('should return LOAD_MORE_TOPICS_SUCCESS status', () => {
    const state = reducer(initialState, loadMoreTopicsSuccess([{ topics: 1 }]));
    expect(state).toEqual(initialState.set('topicsData', [{ topics: 1 }]));
  });

  it('should return LOAD_MORE_TOPICS_ERROR status', () => {
    const state = reducer(initialState, loadMoreTopicsError());
    expect(state).toEqual(initialState.set('error', true));
  });

  it('should return LOAD_TOPICS_FINISH status', () => {
    const state = reducer(initialState, loadTopicsFinish());
    expect(state).toEqual(initialState.set('hasMore', false));
  });
});

describe('HomeRedux actions', () => {
  const middleware = [thunk];
  const store = configureStore(middleware)();
  const callback = jest.fn();

  let mockAxios;

  beforeEach(() => {
    mockAxios = sinon.stub(instance, 'get');
  });

  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  });

  it('getTopicsData() success', async () => {
    const dataArray = [];
    for (let i = 0; i < 11; i += 1) {
      dataArray.push({ id: i });
    }
    mockAxios
      .withArgs(TopicsApi.topics)
      .resolves({ status: 200, data: { data: dataArray } });

    const expectedActions = [loadTopics(), loadTopicsSuccess(dataArray)];
    await store.dispatch(getTopicsData(1, 1, callback)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('getTopicsData() error', async () => {
    mockAxios.withArgs(TopicsApi.topics).rejects();

    const expectedActions = [loadTopics(), loadTopicsError()];
    await store.dispatch(getTopicsData(1, 1, callback)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('getTopicsData() finish', async () => {
    mockAxios
      .withArgs(TopicsApi.topics)
      .resolves({ status: 200, data: { data: [{ id: 1 }] } });

    const expectedActions = [
      loadTopics(),
      loadTopicsSuccess([{ id: 1 }]),
      loadTopicsFinish(),
    ];
    await store.dispatch(getTopicsData(1, 1, callback)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('getMoreTopicsData() success', async () => {
    const dataArray = [];
    for (let i = 0; i < 11; i += 1) {
      dataArray.push({ id: i });
    }
    mockAxios
      .withArgs(TopicsApi.topics)
      .resolves({ status: 200, data: { data: dataArray } });

    const expectedActions = [
      loadMoreTopics(),
      loadMoreTopicsSuccess(dataArray),
    ];
    await store.dispatch(getMoreTopicsData(1, 1, callback)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('getMoreTopicsData() error', async () => {
    mockAxios.withArgs(TopicsApi.topics).rejects();

    const expectedActions = [loadMoreTopics(), loadMoreTopicsError()];
    await store.dispatch(getMoreTopicsData(1, 1, callback)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('getMoreTopicsData() finish', async () => {
    mockAxios
      .withArgs(TopicsApi.topics)
      .resolves({ status: 200, data: { data: [{ id: 1 }] } });

    const expectedActions = [
      loadMoreTopics(),
      loadMoreTopicsSuccess([{ id: 1 }]),
      loadTopicsFinish(),
    ];
    await store.dispatch(getMoreTopicsData(1, 1, callback)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

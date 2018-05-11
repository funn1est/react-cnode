import { Map } from 'immutable';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import reducer, { changeTab } from '../BasicLayoutRedux';

describe('BasicLayoutRedux reducer', () => {
  const initialState = Map({
    tab: 'all',
  });

  it('should return CHANGE_TAB status', () => {
    const state = reducer(initialState, changeTab('ask'));
    expect(state).toEqual(initialState.set('tab', 'ask'));
  });
});

describe('BasicLayoutRedux actions', () => {
  const middleware = [thunk];
  const store = configureStore(middleware)();

  it('changeTab()', () => {
    const expectedActions = [changeTab('dev')];
    store.dispatch(changeTab('dev'));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

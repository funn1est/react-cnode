import { Map } from 'immutable';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import reducer, { editTopic } from '../PostRedux';
import { getUserData } from '../../User/UserRedux';

describe('PostRedux reducer', () => {
  const initialState = Map({
    id: '',
    tab: 'dev',
    title: '',
    content: '',
  });

  it('should return EDIT_TOPIC status', () => {
    const payload = {
      id: '123',
      tab: 'dev',
      title: 'title',
      content: 'content',
    };
    const state = reducer(initialState, editTopic(payload));
    expect(state).toEqual(Map(payload));
  });
});

describe('PostRedux actions', () => {
  const middleware = [thunk];
  const store = configureStore(middleware)();

  it('editTopic()', () => {
    const expectedActions = [editTopic()];
    store.dispatch(editTopic());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

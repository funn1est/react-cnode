import configureStore from '../configureStore';

describe('Redux store', () => {
  it('initialState should match snapshots', () => {
    const store = configureStore();
    expect(store.getState()).toMatchSnapshot();
  });
});

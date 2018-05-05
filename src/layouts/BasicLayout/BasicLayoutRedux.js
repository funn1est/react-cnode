import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const CHANGE_TAB = 'layouts/BasicLayout/CHANGE_TAB';

const initialState = Map({
  tab: 'all',
});

export const changeTab = createAction(CHANGE_TAB);

const reducer = handleActions({
  [CHANGE_TAB]: (state, { payload }) => state.set('tab', payload),
}, initialState);

export default reducer;

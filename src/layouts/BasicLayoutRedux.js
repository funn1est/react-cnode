import { createAction, handleActions } from 'redux-actions';

const CHANGE_TAB = 'layouts/BasicLayout/CHANGE_TAB';

const initialState = {
  tab: 'all',
};

export const changeTab = createAction(CHANGE_TAB, tab => tab);

const reducer = handleActions({
  [CHANGE_TAB]: (state, action) => ({
    ...state,
    tab: action.payload,
  }),
}, initialState);

export default reducer;

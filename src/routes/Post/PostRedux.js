import { createAction, handleActions } from 'redux-actions';

const EDIT_TOPIC = 'routes/POST/EDIT_TOPIC';

const initialState = {
  tab: 'dev',
  title: '',
  content: '',
};

export const editTopic = createAction(EDIT_TOPIC, payload => payload);

const reducer = handleActions({
  [EDIT_TOPIC]: (state, action) => ({
    ...state,
    tab: action.payload.tab,
    title: action.payload.title,
    content: action.payload.content,
  }),
}, initialState);

export default reducer;

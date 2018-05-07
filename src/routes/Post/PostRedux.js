import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const EDIT_TOPIC = 'routes/POST/EDIT_TOPIC';

const initialState = Map({
  id: '',
  tab: 'dev',
  title: '',
  content: '',
});

export const editTopic = createAction(EDIT_TOPIC);

const reducer = handleActions(
  {
    [EDIT_TOPIC]: (state, { payload: { id, tab, title, content } }) =>
      state
        .set('id', id)
        .set('tab', tab)
        .set('title', title)
        .set('content', content),
  },
  initialState,
);

export default reducer;

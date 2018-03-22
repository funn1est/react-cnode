import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import rootReducer from './reducers';

const reducer = combineReducers({
  // ...rootReducer,
});
const middleware = composeWithDevTools(applyMiddleware(thunk));

const configureStore = initialState => createStore(reducer, initialState, middleware);
export default configureStore;

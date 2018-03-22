import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

const reducer = combineReducers({
  ...rootReducer,
});
const middleware = composeWithDevTools(applyMiddleware(thunk));

const configureStore = (initialState) => {
  const store = createStore(
    reducer,
    initialState,
    middleware,
  );
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      // eslint-disable-next-line global-require
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
export default configureStore;

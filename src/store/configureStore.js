import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

const reducer = combineReducers({
  ...rootReducer,
});

let middleware;
if (process.env.NODE_ENV === 'production') {
  middleware = applyMiddleware(thunk);
} else {
  middleware = composeWithDevTools(applyMiddleware(thunk));
}

const configureStore = initialState => {
  const store = createStore(reducer, initialState, middleware);
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = import('./reducers').default;
      store.replaceReducer(combineReducers({ ...nextRootReducer }));
    });
  }

  return store;
};
export default configureStore;

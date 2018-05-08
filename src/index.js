import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { registerServiceWorker } from 'utils';
import configureStore from 'store/configureStore';
import App from './router';
import './index.scss';

const store = configureStore();

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App);
registerServiceWorker();

if (module.hot) {
  module.hot.accept('./router', () => {
    // eslint-disable-next-line global-require
    const newApp = require('./router').default;
    render(newApp);
  });
}

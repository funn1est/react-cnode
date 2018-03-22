import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './router';
import './index.scss';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./router', () => {
    // eslint-disable-next-line global-require
    const newApp = require('./router').default;
    render(newApp);
  });
}

// ReactDOM.render(
//   <App />,
//   document.getElementById('root'),
// );

import { hot } from 'react-hot-loader';
import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { asyncRender } from 'utils';
import configureStore from 'redux/configureStore';

const BasicLayout = asyncRender(
  () => import(/* webpackChunkName: "basic-layout" */'./layouts/BasicLayout'),
);

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <LocaleProvider locale={zhCN}>
        <Router>
          <Switch>
            <Route path="/" component={BasicLayout} />
          </Switch>
        </Router>
      </LocaleProvider>
    </Provider>
  );
};

export default hot(module)(App);

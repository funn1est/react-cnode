import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { asyncRender } from 'utils';

const BasicLayout = asyncRender(
  () => import(/* webpackChunkName: "basic-layout" */'./layouts/BasicLayout'),
);

const App = () => {
  return (
    <LocaleProvider locale={zhCN}>
      <Router>
        <Switch>
          <Route path="/" component={BasicLayout} />
        </Switch>
      </Router>
    </LocaleProvider>
  );
};

export default App;

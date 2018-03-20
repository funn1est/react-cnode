import { hot } from 'react-hot-loader';
import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { asyncRender } from 'utils';

const BasicLayout = asyncRender(
  () => import(/* webpackChunkName: "basic-layout" */'./layouts/BasicLayout'),
);

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={BasicLayout} />
      </Switch>
    </Router>
  );
};

export default hot(module)(App);

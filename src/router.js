import { hot } from 'react-hot-loader';
import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { asyncRender } from 'utils';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          component={asyncRender(() => import(/* webpackChunkName: "basic-layout" */'./layouts/BasicLayout'))}
        />
      </Switch>
    </Router>
  );
};

export default hot(module)(App);

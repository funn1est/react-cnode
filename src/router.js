import { hot } from 'react-hot-loader';
import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { BasicLayout } from 'layouts';

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

import { hot } from 'react-hot-loader';
import React from 'react';
import { Button } from 'antd';

const App = () => {
  return (
    <div>React CNode
      <Button type="primary">Confirm</Button>
    </div>
  );
};

export default hot(module)(App);

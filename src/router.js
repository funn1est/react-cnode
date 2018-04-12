import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { asyncRender } from 'utils';

const BasicLayout = asyncRender(
  () => import(/* webpackChunkName: "basic-layout" */'./layouts/BasicLayout'),
);
const Home = asyncRender(
  () => import(/* webpackChunkName: "Home" */'./routes/Home'),
);
const Topic = asyncRender(
  () => import(/* webpackChunkName: "Topic" */'./routes/Topic'),
);
const User = asyncRender(
  () => import(/* webpackChunkName: "User" */'./routes/User'),
);

const routerConfig = [
  {
    component: BasicLayout,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: '/topic/:id',
        component: Topic,
      },
      {
        path: '/user/:name',
        component: User,
      },
    ],
  },
];

const App = () => {
  return (
    <LocaleProvider locale={zhCN}>
      <Router>
        {renderRoutes(routerConfig)}
      </Router>
    </LocaleProvider>
  );
};

export default App;

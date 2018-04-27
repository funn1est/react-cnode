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
  () => import(/* webpackChunkName: "home" */'./routes/Home'),
);
const Topic = asyncRender(
  () => import(/* webpackChunkName: "topic" */'./routes/Topic'),
);
const User = asyncRender(
  () => import(/* webpackChunkName: "user" */'./routes/User'),
);
const LoginLayout = asyncRender(
  () => import(/* webpackChunkName: "login-layout" */'./layouts/LoginLayout'),
);
const Login = asyncRender(
  () => import(/* webpackChunkName: "login" */'./routes/Login'),
);
const Post = asyncRender(
  () => import(/* webpackChunkName: "post" */'./routes/Post'),
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
        path: '/topic/create',
        exact: true,
        component: Post,
      },
      {
        path: '/topic/:id',
        component: Topic,
      },
      {
        path: '/user/:name',
        component: User,
      },
      {
        component: LoginLayout,
        routes: [
          {
            path: '/login',
            component: Login,
          },
        ],
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

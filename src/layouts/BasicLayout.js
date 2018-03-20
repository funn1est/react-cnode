import React from 'react';
import { Layout, Menu } from 'antd';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { asyncRender } from 'utils';
import styles from './BasicLayout.scss';

const { Header, Content } = Layout;
const Home = asyncRender(
  () => import(/* webpackChunkName: "Home" */'../routes/Home')
);
const Topic = asyncRender(
  () => import(/* webpackChunkName: "Topic" */'../routes/Topic')
);

@withRouter
class BasicLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'all',
    };
  }

  onMenuClicked = (e) => {
    const { location: { pathname }, match } = this.props;
    if (pathname !== '/') {
      this.props.history.push('/');
    }

    this.setState({
      tab: e.key,
    });
  };

  render() {
    const { tab } = this.state;
    return (
      <Layout>
        <Header className={styles.header}>
          <div className="logo" />
          <Menu
            mode="horizontal"
            style={{ lineHeight: '64px' }}
            defaultSelectedKeys={['all']}
            onClick={this.onMenuClicked}
          >
            <Menu.Item key="all">全部</Menu.Item>
            <Menu.Item key="good">精华</Menu.Item>
            <Menu.Item key="share">分享</Menu.Item>
            <Menu.Item key="ask">问答</Menu.Item>
            <Menu.Item key="job">招聘</Menu.Item>
            <Menu.Item key="dev">客户端测试</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ margin: '24px 24px 0' }}>
          <Route path="/" exact render={() => <Home tab={tab} />} />
          <Route path="/topic/:id" component={Topic} />
        </Content>
      </Layout>
    );
  }
}

export default BasicLayout;

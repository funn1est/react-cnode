import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout, Menu } from 'antd';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { asyncRender } from 'utils';
import { changeTab } from './BasicLayoutRedux';
import styles from './BasicLayout.scss';

const { Header, Content } = Layout;
const Home = asyncRender(
  () => import(/* webpackChunkName: "Home" */'../routes/Home'),
);
const Topic = asyncRender(
  () => import(/* webpackChunkName: "Topic" */'../routes/Topic'),
);

@withRouter
@connect(
  state => ({
    tab: state.basic.tab,
  }),
  dispatch => ({
    changeTab: bindActionCreators(changeTab, dispatch),
  }),
)
class BasicLayout extends React.PureComponent {
  onMenuClicked = (e) => {
    const { location: { pathname }, match } = this.props;
    if (pathname !== '/') {
      this.props.history.push('/');
    }

    this.props.changeTab(e.key);
  };

  render() {
    return (
      <Layout className={styles.container}>
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
        <Content className={styles.content}>
          <Route path="/" exact component={Home} />
          <Route path="/topic/:id" component={Topic} />
        </Content>
      </Layout>
    );
  }
}

export default BasicLayout;

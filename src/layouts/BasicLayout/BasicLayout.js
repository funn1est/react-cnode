import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout, Menu } from 'antd';
import { withRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { changeTab } from './BasicLayoutRedux';
import styles from './BasicLayout.scss';

const { Header, Content } = Layout;

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
    const { key } = e;
    const { tab, location: { pathname } } = this.props;
    if (pathname !== '/') {
      this.props.history.push('/');
    }
    if (key !== tab) {
      this.props.changeTab(key);
    }
  };

  render() {
    const { route: { routes } } = this.props;
    return (
      <Layout className={styles.container}>
        <Header className={styles.header}>
          <a href="/">
            <div className={styles.logo} />
          </a>
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
          {renderRoutes(routes)}
        </Content>
      </Layout>
    );
  }
}

export default BasicLayout;

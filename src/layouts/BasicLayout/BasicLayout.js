import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout, Modal } from 'antd';
import { withRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Header from 'components/Header';
import { logout } from 'routes/Login/LoginRedux';
import { changeTab } from './BasicLayoutRedux';
import styles from './BasicLayout.scss';

const { Content } = Layout;

@withRouter
@connect(
  state => ({
    user: state.login.userData,
    tab: state.basic.tab,
  }),
  dispatch => ({
    changeTab: bindActionCreators(changeTab, dispatch),
    logout: bindActionCreators(logout, dispatch),
  }),
)
class BasicLayout extends React.PureComponent {
  onClickMenu = ({ key }) => {
    const { tab, location: { pathname } } = this.props;
    if (key === 'login') {
      this.props.history.push('/login');
    } else if (key === 'logout') {
      const self = this;
      Modal.confirm({
        title: '退出登录',
        content: '是否确认退出登录？',
        maskClosable: true,
        onOk() {
          return new Promise((resolve) => {
            self.props.logout();
            resolve();
          });
        },
      });
    } else {
      if (key !== tab) {
        this.props.changeTab(key);
      }
      if (pathname !== '/') {
        this.props.history.push('/');
      }
    }
  };

  render() {
    const { route: { routes } } = this.props;
    return (
      <Layout className={styles.container}>
        <Header onClickMenu={this.onClickMenu} />
        <Content className={styles.content}>
          {renderRoutes(routes)}
        </Content>
      </Layout>
    );
  }
}

export default BasicLayout;

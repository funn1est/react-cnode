import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { getCurrentUser, logout } from 'routes/Login/LoginRedux';
import { Layout, Modal } from 'antd';
import Header from 'components/Header';
import { changeTab } from './BasicLayoutRedux';
import { userUtils } from '../../utils';
import { FloatingMenu } from './components';
import styles from './BasicLayout.scss';

const { Content } = Layout;

const routesMap = {
  home: '/',
  login: '/login',
  post: '/topic/create',
};

@withRouter
@connect(
  state => ({
    user: state.login.userData,
    tab: state.basic.tab,
  }),
  dispatch => ({
    changeTab: bindActionCreators(changeTab, dispatch),
    getCurrentUser: bindActionCreators(getCurrentUser, dispatch),
    logout: bindActionCreators(logout, dispatch),
  }),
)
class BasicLayout extends React.PureComponent {
  componentDidMount() {
    this.props.getCurrentUser();
  }

  onClickMenu = ({ key }) => {
    const { tab, location: { pathname } } = this.props;
    if (key === 'login') {
      this.navigate(routesMap.login);
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
      if (!Object.is(pathname, '/')) {
        this.navigate(routesMap.home);
      }
    }
  };

  onClickPost = () => {
    const isLogin = userUtils.getUser() !== null;
    if (isLogin) {
      this.navigate(routesMap.post);
    } else {
      this.navigate(routesMap.login);
    }
  };

  onClickTop = () => {
    document.body.scrollTop = 0; // Chrome, Safari, Opera
    document.documentElement.scrollTop = 0; // IE, Firefox
  };

  navigate = (route) => {
    this.props.history.push(route);
  };

  render() {
    const {
      route: { routes }, location: { pathname },
      user,
    } = this.props;
    const isHome = Object.is(pathname, '/');
    return (
      <Layout className={styles.container}>
        <Header user={user} onClickMenu={this.onClickMenu} />
        <Content className={styles.content}>
          {renderRoutes(routes)}
        </Content>
        <FloatingMenu
          isHome={isHome}
          onClickPost={this.onClickPost}
          onClickTop={this.onClickTop}
        />
      </Layout>
    );
  }
}

BasicLayout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  route: PropTypes.shape({
    routes: PropTypes.array,
  }),
  tab: PropTypes.string,
  user: PropTypes.object,
  changeTab: PropTypes.func,
  getCurrentUser: PropTypes.func,
};

export default BasicLayout;

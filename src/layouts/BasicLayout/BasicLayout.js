import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import { getCurrentUser, logout } from 'routes/Login/LoginRedux';
import { scrollUtils, regexUtils } from 'utils';
import { Layout, Modal } from 'antd';
import classNames from 'classnames';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { changeTab } from './BasicLayoutRedux';
import { FloatingMenu } from './components';
import styles from './BasicLayout.scss';

const contentCls = classNames(styles.content, styles.lgContainer);

const quireString = 'only screen and (max-width: 767.98px)';

const routesMap = {
  home: '/',
  user: '/user/',
  login: '/login',
  post: '/topic/create',
};

export class BasicLayoutComponent extends React.PureComponent {
  state = {
    isMobile: false,
  };

  componentDidMount() {
    this.props.getCurrentUser();
    this.getIsMobile();
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler);
  }

  onClickMenu = ({ key }) => {
    const {
      tab,
      user,
      location: { pathname },
    } = this.props;
    if (key === 'login') {
      this.navigate(routesMap.login);
    } else if (key === 'logout') {
      this.renderLogoutModal();
    } else if (key === 'user') {
      this.navigate(routesMap.user + user.name);
    } else if (key !== undefined) {
      // TODO antd menu onClick bug
      // change tab when click a new tab
      if (key !== tab) {
        this.props.changeTab(key);
      }
      if (!Object.is(pathname, '/')) {
        this.navigate(routesMap.home);
      }
    }
  };

  onClickUser = ({ key }) => {
    if (key === 'user') {
      const {
        user: { name },
      } = this.props;
      this.navigate(routesMap.user + name);
    } else if (key === 'logout') {
      this.renderLogoutModal();
    }
  };

  onClickUserLogin = () => {
    this.navigate(routesMap.login);
  };

  onClickPost = () => {
    this.navigate(routesMap.post);
  };

  onClickTop = () => {
    scrollUtils.scrollTo(0);
  };

  getIsMobile = () => {
    this.enquireHandler = enquireScreen(mobile => {
      this.setState({
        isMobile: mobile || false,
      });
    }, quireString);
  };

  navigate = route => {
    this.props.history.push(route);
  };

  renderLogoutModal = () => {
    const self = this;
    Modal.confirm({
      title: '退出登录',
      content: '是否确认退出登录？',
      maskClosable: true,
      onOk() {
        return new Promise(resolve => {
          self.props.logout();
          resolve();
        });
      },
    });
  };

  render() {
    const {
      route: { routes },
      location: { pathname },
      user,
    } = this.props;
    const { isMobile } = this.state;
    const renderPost = Object.is(pathname, '/');
    const renderUser =
      isMobile &&
      !regexUtils.userRouteRegex.test(pathname) &&
      !regexUtils.loginRouteRegex.test(pathname);
    return (
      <Layout className={styles.container}>
        <Header
          isMobile={isMobile}
          user={user}
          onClickMenu={this.onClickMenu}
        />
        <Layout.Content className={contentCls}>
          {renderRoutes(routes)}
        </Layout.Content>
        <FloatingMenu
          renderUser={renderUser}
          renderPost={renderPost}
          user={user}
          onClickUser={this.onClickUser}
          onClickUserLogin={this.onClickUserLogin}
          onClickPost={this.onClickPost}
          onClickTop={this.onClickTop}
        />
        <Footer />
      </Layout>
    );
  }
}

BasicLayoutComponent.propTypes = {
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

export default withRouter(
  connect(
    state => ({
      user: state.getIn(['login', 'userData']),
      tab: state.getIn(['basic', 'tab']),
    }),
    {
      changeTab,
      getCurrentUser,
      logout,
    },
  )(BasicLayoutComponent),
);

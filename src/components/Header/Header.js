import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Layout, Menu, Avatar, Icon } from 'antd';
import classNames from 'classnames';
import styles from './Header.scss';

const menuConfig = [
  {
    key: 'all',
    name: '全部',
  },
  {
    key: 'good',
    name: '精华',
  },
  {
    key: 'share',
    name: '分享',
  },
  {
    key: 'ask',
    name: '问答',
  },
  {
    key: 'job',
    name: '招聘',
  },
  // {
  //   key: 'dev',
  //   name: '测试',
  // },
];

const headerCls = classNames(styles.header, styles.lgContainer);

const User = ({ name, avatar }) => (
  <span>
    <Avatar
      className={styles.avatar}
      size="small"
      src={avatar}
    />
    {name}
  </span>
);

const Account = ({ isLogin, name, avatar, onClickMenu }) => {
  if (isLogin) {
    return (
      <div className={styles.right}>
        <Menu
          mode="horizontal"
          selectable={false}
          onClick={onClickMenu}
        >
          <Menu.SubMenu
            className={styles.account}
            title={<User name={name} avatar={avatar} />}
          >
            <Menu.Item key="user"><Icon type="user" />用户中心</Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </div>
    );
  }
  return (
    <div className={styles.right}>
      <Menu
        className={styles.account}
        mode="horizontal"
        selectable={false}
        onClick={onClickMenu}
      >
        <Menu.Item key="login">登录</Menu.Item>
      </Menu>
    </div>
  );
};

class Header extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.isMobile !== this.props.isMobile ||
      nextProps.user !== this.props.user;
  }

  render() {
    const { isMobile, user, onClickMenu } = this.props;
    return (
      <Layout.Header className={styles.container}>
        <div className={headerCls}>
          <Link to="/">
            <div className={styles.logo} />
          </Link>
          <Menu
            className={styles.menu}
            mode="horizontal"
            defaultSelectedKeys={['all']}
            onClick={onClickMenu}
          >
            {menuConfig.map(item => (
              <Menu.Item key={item.key}>{item.name}</Menu.Item>
            ))}
          </Menu>
          {
            !isMobile && (
              <Account
                isLogin={user.id !== undefined}
                name={user.name}
                avatar={user.avatar}
                onClickMenu={onClickMenu}
              />
            )
          }
        </div>
      </Layout.Header>
    );
  }
}

User.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
};

Account.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  name: PropTypes.string,
  avatar: PropTypes.string,
  onClickMenu: PropTypes.func.isRequired,
};

Header.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  onClickMenu: PropTypes.func.isRequired,
};

export default Header;

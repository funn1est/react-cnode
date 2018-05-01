import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Dropdown, Avatar, Icon } from 'antd';
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
  {
    key: 'dev',
    name: '测试',
  },
];

const Header = ({ isMobile, user, onClickMenu }) => {
  const isLogin = user.id !== undefined;
  const User = (
    <span>
      <Avatar
        className={styles.avatar}
        size="small"
        src={user.avatar}
      />
      {user.name}
    </span>
  );
  const Account = (
    <div className={styles.right}>
      {isLogin ?
        (
          <Menu
            mode="horizontal"
            onClick={onClickMenu}
          >
            <Menu.SubMenu title={User} className={styles.account}>
              <Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        ) :
        (
          <Menu
            className={styles.account}
            mode="horizontal"
            selectable={false}
            onClick={onClickMenu}
          >
            <Menu.Item key="login">登录</Menu.Item>
          </Menu>
        )}
    </div>
  );

  return (
    <Layout.Header className={styles.container}>
      <div className={styles.header}>
        <a href="/">
          <div className={styles.logo} />
        </a>
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
        {!isMobile && Account}
      </div>
    </Layout.Header>
  );
};
Header.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  onClickMenu: PropTypes.func.isRequired,
};

export default Header;

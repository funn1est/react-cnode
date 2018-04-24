import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
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

const Header = ({ onClickMenu }) => (
  <Layout.Header className={styles.header}>
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
  </Layout.Header>
);
Header.propTypes = {
  onClickMenu: PropTypes.func.isRequired,
};

export default Header;

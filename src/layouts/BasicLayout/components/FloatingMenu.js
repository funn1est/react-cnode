import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Dropdown, Avatar, Button } from 'antd';
import styles from './FloatingMenu.scss';

const FloatingMenu = ({
  renderUser,
  renderPost,
  user,
  onClickUser,
  onClickUserLogin,
  onClickPost,
  onClickTop,
}) => {
  const isLogin = user.id !== undefined;
  const userMenuOverlay = (
    <Menu onClick={onClickUser}>
      <Menu.Item key="user">
        <Icon type="user" />用户中心
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <Icon type="logout" />退出登录
      </Menu.Item>
    </Menu>
  );
  const UserMenu = (
    <Dropdown overlay={userMenuOverlay} trigger={['click']} placement="topLeft">
      <Avatar className={styles.user} size="large" src={user.avatar} />
    </Dropdown>
  );
  const LoginMenu = (
    <Avatar className={styles.user} size="large" onClick={onClickUserLogin}>
      登录
    </Avatar>
  );
  return (
    <div className={styles.container}>
      {renderUser && (isLogin ? UserMenu : LoginMenu)}
      {renderPost && (
        <Button
          className={styles.post}
          type="primary"
          shape="circle"
          size="large"
          icon="edit"
          onClick={onClickPost}
        />
      )}
      <Button
        type="primary"
        shape="circle"
        size="large"
        icon="arrow-up"
        onClick={onClickTop}
      />
    </div>
  );
};

FloatingMenu.propTypes = {
  renderUser: PropTypes.bool.isRequired,
  renderPost: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  onClickUser: PropTypes.func.isRequired,
  onClickUserLogin: PropTypes.func.isRequired,
  onClickPost: PropTypes.func.isRequired,
  onClickTop: PropTypes.func.isRequired,
};

export default FloatingMenu;

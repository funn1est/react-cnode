import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button } from 'antd';
import styles from './FloatingMenu.scss';

const FloatingMenu = ({ renderUser, renderPost, avatar, onClickUser, onClickPost, onClickTop }) => (
  <div className={styles.container}>
    {
      renderUser && (
        <Avatar
          className={styles.user}
          size="large"
          src={avatar}
          onClick={onClickUser}
        />
      )
    }
    {
      renderPost && (
        <Button
          className={styles.post}
          type="primary"
          shape="circle"
          size="large"
          icon="edit"
          onClick={onClickPost}
        />
      )
    }
    <Button
      type="primary"
      shape="circle"
      size="large"
      icon="arrow-up"
      onClick={onClickTop}
    />
  </div>
);

FloatingMenu.propTypes = {
  renderUser: PropTypes.bool.isRequired,
  renderPost: PropTypes.bool.isRequired,
  avatar: PropTypes.string,
  onClickUser: PropTypes.func.isRequired,
  onClickPost: PropTypes.func.isRequired,
  onClickTop: PropTypes.func.isRequired,
};

export default FloatingMenu;

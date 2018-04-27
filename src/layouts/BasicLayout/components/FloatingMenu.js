import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import styles from './FloatingMenu.scss';

const FloatingMenu = ({ isHome, onClickPost, onClickTop }) => (
  <div className={styles.container}>
    {
      isHome && (
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
  isHome: PropTypes.bool.isRequired,
  onClickPost: PropTypes.func.isRequired,
  onClickTop: PropTypes.func.isRequired,
};

export default FloatingMenu;

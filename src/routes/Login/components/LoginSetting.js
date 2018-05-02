import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import styles from './LoginSetting.scss';

const LoginSetting = ({ remember, onChange }) => (
  <div className={styles.container}>
    <Checkbox checked={remember} onChange={onChange}>
      自动登录
    </Checkbox>
    <a
      className={styles.href}
      target="_blank"
      href="https://cnodejs.org/setting"
      rel="noopener noreferrer"
    >
      查看 Token
    </a>
  </div>
);

LoginSetting.propTypes = {
  remember: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LoginSetting;

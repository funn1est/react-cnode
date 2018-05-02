import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'antd';
import styles from './LoginSubmit.scss';

const LoginSubmit = ({ loading }) => (
  <Form.Item className={styles.container}>
    <Button
      className={styles.button}
      type="primary"
      htmlType="submit"
      loading={loading}
    >
      登录
    </Button>
  </Form.Item>
);

LoginSubmit.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default LoginSubmit;

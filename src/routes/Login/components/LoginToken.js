import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Icon } from 'antd';
import { regexUtils } from 'utils';
import styles from './LoginToken.scss';

class LoginToken extends React.Component {
  static contextTypes = {
    form: PropTypes.object,
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.context;
    return (
      <Form.Item className={styles.container}>
        {getFieldDecorator('token', {
          rules: [
            {
              required: true,
              message: '请输入 Access Token',
            },
            {
              pattern: regexUtils.tokenRegex,
              message: '请输入正确的 Access Token',
            },
          ],
        })(
          <Input
            prefix={<Icon className={styles.icon} type="key" />}
            placeholder="请输入 CNode 的 Access Token"
          />,
        )}
      </Form.Item>
    );
  }
}

export default LoginToken;

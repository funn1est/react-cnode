import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Icon } from 'antd';

class LoginToken extends React.Component {
  static contextTypes = {
    form: PropTypes.object,
  };

  render() {
    const { form: { getFieldDecorator } } = this.context;
    return (
      <Form.Item>
        {getFieldDecorator('token', {
          rules: [{ required: true, message: '请输入正确的 Access Token' }],
        })(
          <Input
            prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="请输入 CNode 的 Access Token"
          />,
        )}
      </Form.Item>
    );
  }
}

export default LoginToken;

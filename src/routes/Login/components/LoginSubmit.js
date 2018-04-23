import React from 'react';
import { Button, Form, Checkbox } from 'antd';
import PropTypes from 'prop-types';

class LoginSubmit extends React.Component {
  static contextTypes = {
    form: PropTypes.object,
  };

  render() {
    const { form: { getFieldDecorator } } = this.context;
    return (
      <Form.Item>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: false,
        })(
          <Checkbox>自动登录</Checkbox>,
        )}
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          登录
        </Button>
      </Form.Item>
    );
  }
}

export default LoginSubmit;

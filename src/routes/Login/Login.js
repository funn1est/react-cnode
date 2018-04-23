import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { LoginToken, LoginSubmit } from './components';

@Form.create()
class Login extends React.Component {
  static propTypes = {
    form: PropTypes.object,
  };

  static childContextTypes = {
    form: PropTypes.object,
  };

  getChildContext() {
    return {
      form: this.props.form,
    };
  }

  onClickSubmit = (e) => {
    e.preventDefault();
    const { form: { validateFields } } = this.props;
    validateFields((err, values) => {
      console.log(values);
    });
  };

  render() {
    return (
      <Form onSubmit={this.onClickSubmit}>
        <LoginToken />
        <LoginSubmit />
      </Form>
    );
  }
}

export default Login;

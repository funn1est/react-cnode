import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form } from 'antd';
import { LoginToken, LoginSubmit } from './components';
import { login } from './LoginRedux';

@withRouter
@Form.create()
@connect(
  () => ({}),
  dispatch => ({
    userLogin: bindActionCreators(login, dispatch),
  }),
)
class Login extends React.Component {
  static propTypes = {
    form: PropTypes.object,
    userLogin: PropTypes.func,
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
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
    const { form: { validateFields }, userLogin, history } = this.props;
    validateFields((err, values) => {
      if (!err) {
        const { token, remember } = values;
        userLogin(token, remember, () => {
          history.push('/');
        });
      }
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

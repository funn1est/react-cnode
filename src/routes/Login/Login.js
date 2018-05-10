import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form } from 'antd';
import classNames from 'classnames';
import { LoginToken, LoginSetting, LoginSubmit } from './components';
import { login } from './LoginRedux';
import styles from './Login.scss';

const cls = classNames(styles.container, styles.xsContainer);

export class LoginComponent extends React.Component {
  static childContextTypes = {
    form: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      remember: false,
    };
  }

  getChildContext() {
    return {
      form: this.props.form,
    };
  }

  onRememberChange = ({ target: { checked } }) => {
    this.setState({
      remember: checked,
    });
  };

  onClickSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFields },
      userLogin,
      history,
    } = this.props;
    validateFields((err, values) => {
      if (!err) {
        const { token } = values;
        const { remember } = this.state;
        userLogin(token, remember, () => {
          history.push('/');
        });
      }
    });
  };

  render() {
    const { loading } = this.props;
    const { remember } = this.state;
    return (
      <Form className={cls} onSubmit={this.onClickSubmit}>
        <LoginToken />
        <LoginSetting remember={remember} onChange={this.onRememberChange} />
        <LoginSubmit loading={loading} />
      </Form>
    );
  }
}

LoginComponent.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),

  form: PropTypes.object,
  loading: PropTypes.bool,
  userLogin: PropTypes.func,
};

export default withRouter(
  Form.create()(
    connect(
      state => ({
        loading: state.getIn(['login', 'loading']),
      }),
      {
        userLogin: login,
      },
    )(LoginComponent),
  ),
);

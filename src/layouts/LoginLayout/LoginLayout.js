import React from 'react';
import { renderRoutes } from 'react-router-config';
import styles from './LoginLayout.scss';

class LoginLayout extends React.Component {
  render() {
    const { route: { routes } } = this.props;
    return (
      <div className={styles.container}>
        {renderRoutes(routes)}
      </div>
    );
  }
}

export default LoginLayout;

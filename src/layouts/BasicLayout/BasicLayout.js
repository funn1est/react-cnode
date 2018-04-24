import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Header from 'components/Header';
import { changeTab } from './BasicLayoutRedux';
import styles from './BasicLayout.scss';

const { Content } = Layout;

@withRouter
@connect(
  state => ({
    tab: state.basic.tab,
  }),
  dispatch => ({
    changeTab: bindActionCreators(changeTab, dispatch),
  }),
)
class BasicLayout extends React.PureComponent {
  onClickMenu = (e) => {
    const { key } = e;
    const { tab, location: { pathname } } = this.props;
    if (pathname !== '/') {
      this.props.history.push('/');
    }
    if (key !== tab) {
      this.props.changeTab(key);
    }
  };

  render() {
    const { route: { routes } } = this.props;
    return (
      <Layout className={styles.container}>
        <Header onClickMenu={this.onClickMenu} />
        <Content className={styles.content}>
          {renderRoutes(routes)}
        </Content>
      </Layout>
    );
  }
}

export default BasicLayout;

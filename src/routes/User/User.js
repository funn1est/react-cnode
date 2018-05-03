import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import { getUserData } from './UserRedux';
import { UserInfo, UserTopics } from './components';
import styles from './User.scss';

const cls = classNames(styles.mdContainer);

@connect(
  state => ({
    loading: state.user.loading,
    userData: state.user.userData,
  }),
  dispatch => ({
    getUserData: bindActionCreators(getUserData, dispatch),
  }),
)
class User extends React.Component {
  componentDidMount() {
    const { match: { params: { name } } } = this.props;
    this.props.getUserData(name);
  }

  render() {
    const {
      loading,
      userData,
    } = this.props;
    return (
      <div className={cls}>
        <UserInfo
          loading={loading}
          user={userData}
        />
        <UserTopics
          loading={loading}
          dataList={{
            topics: userData.recent_topics || [],
            replies: userData.recent_replies || [],
          }}
        />
      </div>
    );
  }
}

export default User;

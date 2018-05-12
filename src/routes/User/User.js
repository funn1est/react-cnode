import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Exception from 'components/Exception';
import { getUserData } from './UserRedux';
import { UserInfo, UserTopics } from './components';
import styles from './User.scss';

const cls = classNames(styles.mdContainer);

export class UserComponent extends React.Component {
  constructor(props) {
    super(props);
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { name: prevName },
      },
    } = prevProps;
    const {
      match: {
        params: { name },
      },
    } = this.props;
    if (name !== prevName) {
      this.getUser();
    }
  }

  getUser() {
    const {
      match: {
        params: { name },
      },
    } = this.props;
    this.props.getUserData(name);
  }

  render() {
    const { loading, userData, error } = this.props;
    if (error) {
      return <Exception />;
    }
    return (
      <div className={cls}>
        <UserInfo loading={loading} user={userData} />
        {!loading && (
          <UserTopics
            dataList={{
              topics: userData.recent_topics,
              replies: userData.recent_replies,
              collect: userData.collect,
            }}
          />
        )}
      </div>
    );
  }
}

UserComponent.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,

  loading: PropTypes.bool,
  userData: PropTypes.object,
  error: PropTypes.bool,
  getUserData: PropTypes.func,
};

export default connect(
  state => ({
    loading: state.getIn(['user', 'loading']),
    userData: state.getIn(['user', 'userData']),
    error: state.getIn(['user', 'error']),
  }),
  {
    getUserData,
  },
)(UserComponent);

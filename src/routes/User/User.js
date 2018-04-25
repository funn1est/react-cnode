import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, Avatar } from 'antd';
import { timeUtils } from 'utils';
import { getUserData } from './UserRedux';
import { UserMain } from './components';

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
      userData: {
        avatar_url,
        loginname,
        githubUsername,
        create_at,
        recent_topics,
        recent_replies,
      },
    } = this.props;
    return (
      <div>
        <Card loading={loading}>
          <Card.Meta
            avatar={<Avatar src={avatar_url} />}
            title={loginname}
            description={
              <div>
                <div>{`Github: ${githubUsername}`}</div>
                <div>{`注册时间: ${timeUtils.fromNow(create_at)}`}</div>
              </div>
            }
          />
        </Card>
        <UserMain
          loading={loading}
          dataList={{
            topics: recent_topics || [],
            replies: recent_replies || [],
          }}
        />
      </div>
    );
  }
}

export default User;

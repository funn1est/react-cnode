import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, Icon, Avatar } from 'antd';
import { getUserData } from './UserRedux';
import { UserMain } from './components';
import { timeUtils } from 'utils';

const { Meta } = Card;

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
          <Meta
            avatar={<Avatar src={avatar_url} />}
            title={loginname}
            description={`注册时间: ${timeUtils.fromNow(create_at)}`}
          />
        </Card>
        <UserMain
          loading={loading}
          contentList={{
            topics: recent_topics || [],
            replies: recent_replies || [],
          }}
        />
      </div>
    );
  }
}

export default User;

import React from 'react';
import PropTypes from 'prop-types';
import { timeUtils } from 'utils';
import { Card, Avatar, Tag } from 'antd';
import styles from './UserInfo.scss';

const UserInfo = ({ loading, user }) => (
  <Card className={styles.container} loading={loading}>
    <Card.Meta
      avatar={<Avatar src={user.avatar_url} />}
      title={<Tag color="purple">{user.loginname}</Tag>}
      description={
        <React.Fragment>
          <div>
            Github：
            <a
              target="_blank"
              href={`https://github.com/${user.githubUsername}`}
              rel="noopener noreferrer"
            >
              {user.githubUsername}
            </a>
          </div>
          <div>积分：{user.score}</div>
          <div>收藏话题：{user.collect && user.collect.length} 个</div>
          <div>注册时间：{timeUtils.fromNow(user.create_at)}</div>
        </React.Fragment>
      }
    />
  </Card>
);

UserInfo.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

export default UserInfo;

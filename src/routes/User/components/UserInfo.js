import React from 'react';
import { Card, Avatar } from 'antd';
import { timeUtils } from 'utils';
import styles from './UserInfo.scss';

const UserInfo = ({ loading, user }) => (
  <Card className={styles.container} loading={loading}>
    <Card.Meta
      avatar={<Avatar src={user.avatar_url} />}
      title={user.loginname}
      description={
        <div>
          <div>{`Github: ${user.githubUsername}`}</div>
          <div>{`注册时间: ${timeUtils.fromNow(user.create_at)}`}</div>
        </div>
      }
    />
  </Card>
);

export default UserInfo;

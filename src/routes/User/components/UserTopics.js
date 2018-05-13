import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { timeUtils } from 'utils';
import { Card, List, Avatar, Tag, Divider } from 'antd';
import styles from './UserTopics.scss';

const tabList = [
  {
    key: 'topics',
    tab: '最近创建的话题',
  },
  {
    key: 'replies',
    tab: '最近参与的话题',
  },
  {
    key: 'collect',
    tab: '收藏的话题',
  },
];

export const UserMainContent = ({ data }) => (
  <List
    locale={{ emptyText: '无话题' }}
    dataSource={data}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={item.author.avatar_url} />}
          title={<Link to={`/topic/${item.id}`}>{item.title}</Link>}
          description={
            <div>
              <Tag color="purple">{item.author.loginname}</Tag>
              <Divider type="vertical" />
              {timeUtils.fromNow(item.last_reply_at)}
            </div>
          }
        />
      </List.Item>
    )}
  />
);

class UserTopics extends React.Component {
  static propTypes = {
    dataList: PropTypes.object.isRequired,
  };

  state = {
    key: 'topics',
  };

  onTabChange = key => {
    this.setState({ key });
  };

  render() {
    const { dataList } = this.props;
    const { key } = this.state;

    return (
      <Card
        className={styles.container}
        tabList={tabList}
        defaultActiveTabKey="topics"
        onTabChange={this.onTabChange}
      >
        <UserMainContent data={dataList[key]} />
      </Card>
    );
  }
}

UserMainContent.propTypes = {
  data: PropTypes.array,
};

export default UserTopics;

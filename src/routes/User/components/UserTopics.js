import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, List, Avatar } from 'antd';
import styles from './UserTopics.scss';

const tabList = [
  {
    key: 'topics',
    tab: '最近创建的话题',
  }, {
    key: 'replies',
    tab: '最近参与的话题',
  },
];

export const UserMainContent = ({ data }) => {
  if (data.length === 0) {
    return <div>无话题</div>;
  } else {
    return (
      <List
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.author.avatar_url} />}
              title={<Link to={`/topic/${item.id}`}>{item.title}</Link>}
            />
          </List.Item>
        )}
      />
    );
  }
};

class UserTopics extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    dataList: PropTypes.shape({
      topics: PropTypes.array.isRequired,
      replies: PropTypes.array.isRequired,
    }).isRequired,
  };

  state = {
    key: 'topics',
  };

  onTabChange = (key) => {
    this.setState({ key });
  };

  render() {
    const { loading, dataList } = this.props;
    const { key } = this.state;

    return (
      <Card
        className={styles.container}
        loading={loading}
        tabList={tabList}
        onTabChange={this.onTabChange}
      >
        <UserMainContent data={dataList[key]} />
      </Card>
    );
  }
}

export default UserTopics;
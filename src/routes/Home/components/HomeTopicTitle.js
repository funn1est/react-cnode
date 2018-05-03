import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Avatar, Tag } from 'antd';
import styles from './HomeTopicTitle.scss';

const HomeTopicTitle = ({ topic, tab }) => {
  const renderTag = (key, isTop, isGood) => {
    const Tabs = {
      top: <Tag color="red">置顶</Tag>,
      good: <Tag color="green">精华</Tag>,
      share: <Tag color="blue">分享</Tag>,
      ask: <Tag color="orange">问答</Tag>,
      job: <Tag color="geekblue">招聘</Tag>,
    };
    if (isTop) {
      return Tabs.top;
    } else if (isGood && !Object.is(tab, 'good')) {
      return Tabs.good;
    } else if (Object.is(tab, 'all')) {
      return Tabs[key];
    } else {
      return null;
    }
  };
  return (
    <div className={styles.container}>
      <div>
        <Avatar
          className={styles.avatar}
          size="small"
          shape="square"
          src={topic.author.avatar_url}
        />
        <Link to={`/user/${topic.author.loginname}`}>
          <Tag color="purple">{topic.author.loginname}</Tag>
        </Link>
      </div>
      <div className={styles.title}>
        {renderTag(topic.tab, topic.top, topic.good)}
        <Link to={`/topic/${topic.id}`}>{topic.title}</Link>
      </div>
    </div>
  );
};

HomeTopicTitle.propTypes = {
  topic: PropTypes.object.isRequired,
  tab: PropTypes.string.isRequired,
};

export default HomeTopicTitle;

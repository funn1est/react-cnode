import React from 'react';
import PropTypes from 'prop-types';
import { List, Card } from 'antd';
import HomeTopicTitle from './HomeTopicTitle';
import HomeTopicContent from './HomeTopicContent';
import styles from './HomeTopics.scss';

const HomeTopics = ({ tab, loading, topicsData }) => (
  <List
    className={styles.container}
    size="large"
    grid={{ gutter: 16, column: 1 }}
    dataSource={topicsData}
    loading={loading}
    pagination={{
      showSizeChanger: true,
      showQuickJumper: true,
    }}
    renderItem={item => (
      <List.Item>
        <Card
          title={<HomeTopicTitle topic={item} tab={tab} />}
        >
          <Card.Meta
            description={<HomeTopicContent topic={item} />}
          />
        </Card>
      </List.Item>
    )}
  />
);

HomeTopics.propTypes = {
  tab: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  topicsData: PropTypes.array.isRequired,
};

export default HomeTopics;

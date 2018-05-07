import React from 'react';
import PropTypes from 'prop-types';
import { List, Card, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import HomeTopicTitle from './HomeTopicTitle';
import HomeTopicContent from './HomeTopicContent';
import styles from './HomeTopics.scss';

const HomeTopics = ({
  tab,
  loading,
  loadingMore,
  hasMore,
  topicsData,
  handleInfiniteOnLoad,
}) => {
  return (
    <InfiniteScroll
      initialLoad={false}
      pageStart={0}
      loadMore={handleInfiniteOnLoad}
      hasMore={!loadingMore && hasMore}
    >
      <List
        className={styles.container}
        size="large"
        grid={{ gutter: 16, column: 1 }}
        dataSource={topicsData}
        loading={loading}
        renderItem={item => (
          <List.Item>
            <Card title={<HomeTopicTitle topic={item} tab={tab} />}>
              <Card.Meta description={<HomeTopicContent topic={item} />} />
            </Card>
          </List.Item>
        )}
      >
        {loadingMore &&
          hasMore && (
            <div className={styles.loadingMore}>
              <Spin size="large" />
            </div>
          )}
        {!hasMore && <div className={styles.bottom}>我也是有底线的</div>}
      </List>
    </InfiniteScroll>
  );
};

HomeTopics.propTypes = {
  tab: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  loadingMore: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool.isRequired,
  topicsData: PropTypes.array.isRequired,
  handleInfiniteOnLoad: PropTypes.func.isRequired,
};

export default HomeTopics;

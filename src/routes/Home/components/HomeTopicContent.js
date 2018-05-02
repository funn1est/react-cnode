import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'antd';
import { timeUtils } from 'utils';
import Ellipsis from 'components/Ellipsis';
import styles from './HomeTopicContent.scss';

const HomeTopicContent = ({ topic }) => (
  <div>
    <Ellipsis text={topic.content.replace(/<[^>]*>/g, '')} />
    <div className={styles.info}>
      {`阅读数:${topic.visit_count}`}
      <Divider type="vertical" />
      {`${topic.reply_count}条评论`}
      <Divider type="vertical" />
      {timeUtils.fromNow(topic.last_reply_at)}
    </div>
  </div>
);

HomeTopicContent.propTypes = {
  topic: PropTypes.object.isRequired,
};

export default HomeTopicContent;

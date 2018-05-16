import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { List as ImmutableList } from 'immutable';
import { timeUtils } from 'utils';
import { Card, List, Avatar, Tag, Divider } from 'antd';
import Markdown from 'react-markdown';
import TopicUp from './TopicUp';
import styles from './TopicReplies.scss';

const Replies = ({
  repliesResult,
  authorName,
  current,
  pageSize,
  onReplyPageChange,
  onReplySizeChange,
  onClickUp,
}) => {
  if (repliesResult.size === 0) {
    return null;
  }

  const sliceStart = (current - 1) * pageSize;
  const sliceEnd = sliceStart + pageSize;
  const repliesSlice = repliesResult.slice(sliceStart, sliceEnd);

  return (
    <Card id="topic__reply" className={styles.container} title="回复">
      <List
        dataSource={repliesSlice}
        pagination={{
          total: repliesResult.size,
          current,
          pageSize,
          showSizeChanger: true,
          showQuickJumper: true,
          onChange: onReplyPageChange,
          onShowSizeChange: onReplySizeChange,
        }}
        renderItem={(item, key) => (
          <TopicReply
            authorName={authorName}
            replyId={item}
            order={key + 1 + (current - 1) * pageSize}
            onClickUp={onClickUp}
          />
        )}
      />
    </Card>
  );
};

const Reply = ({
  replyId,
  authorName,
  username,
  avatar,
  createAt,
  content,
  order,
  onClickUp,
}) => (
  <List.Item className={styles.content} id={replyId}>
    <List.Item.Meta
      avatar={<Avatar src={avatar} size="large" />}
      title={
        <div className={styles.header}>
          <Link to={`/user/${username}`}>
            <Tag color={authorName === username ? 'green' : 'purple'}>
              {username}
            </Tag>
          </Link>
          <Divider type="vertical" />
          <a href={`#${replyId}`}>{`${order} 楼`}</a>
          <Divider type="vertical" />
          <span>{timeUtils.fromNow(createAt)}</span>
          <Divider type="vertical" />
          <TopicUp replyId={replyId} onClickUp={onClickUp} />
        </div>
      }
      description={<Markdown className="markdown-body" source={content} />}
    />
  </List.Item>
);

const TopicReply = connect((state, { replyId }) => ({
  username: state.getIn([
    'topic',
    'repliesData',
    'entities',
    replyId,
    'author',
    'loginname',
  ]),
  avatar: state.getIn([
    'topic',
    'repliesData',
    'entities',
    replyId,
    'author',
    'avatar_url',
  ]),
  createAt: state.getIn([
    'topic',
    'repliesData',
    'entities',
    replyId,
    'create_at',
  ]),
  content: state.getIn([
    'topic',
    'repliesData',
    'entities',
    replyId,
    'content',
  ]),
}))(Reply);

Replies.propTypes = {
  repliesResult: PropTypes.instanceOf(ImmutableList).isRequired,
  authorName: PropTypes.string,
  current: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onReplyPageChange: PropTypes.func.isRequired,
  onReplySizeChange: PropTypes.func.isRequired,
  onClickUp: PropTypes.func.isRequired,
};

Reply.propTypes = {
  replyId: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  createAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
  onClickUp: PropTypes.func.isRequired,
};

export default connect(state => ({
  repliesResult: state.getIn(['topic', 'repliesData', 'result']),
  authorName: state.getIn(['topic', 'topicData', 'author', 'loginname']),
}))(Replies);

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { timeUtils } from 'utils';
import { Card, List, Avatar, Tag, Divider } from 'antd';
import Markdown from 'react-markdown';
import TopicUp from './TopicUp';
import styles from './TopicReply.scss';

const TopicReply = ({
  dataSource, total, current, pageSize,
  onClickUp, onReplyPageChange, onReplySizeChange,
}) => (
  <Card
    id="topic__reply"
    className={styles.container}
    title="回复"
  >
    <List
      dataSource={dataSource}
      pagination={{
        total,
        current,
        pageSize,
        showSizeChanger: true,
        showQuickJumper: true,
        onChange: onReplyPageChange,
        onShowSizeChange: onReplySizeChange,
      }}
      renderItem={(item, key) => (
        <List.Item className={styles.content} id={item.id}>
          <List.Item.Meta
            avatar={<Avatar src={item.author.avatar_url} size="large" />}
            title={(
              <div className={styles.header}>
                <Link to={`/user/${item.author.loginname}`}>
                  <Tag color="purple">{item.author.loginname}</Tag>
                </Link>
                <Divider type="vertical" />
                <a href={`#${item.id}`}>
                  {`${key + 1 + ((current - 1) * pageSize)} 楼`}
                </a>
                <Divider type="vertical" />
                <span>
                  {timeUtils.fromNow(item.create_at)}
                </span>
                <Divider type="vertical" />
                <TopicUp
                  itemKey={key + ((current - 1) * pageSize)}
                  id={item.id}
                  ups={item.ups}
                  isUp={item.is_uped}
                  onClickUp={onClickUp}
                />
              </div>
            )}
            description={
              <Markdown className="markdown-body" source={item.content} />
            }
          />
        </List.Item>
      )}
    />
  </Card>
);

TopicReply.propTypes = {
  dataSource: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onClickUp: PropTypes.func.isRequired,
  onReplyPageChange: PropTypes.func.isRequired,
  onReplySizeChange: PropTypes.func.isRequired,
};

export default TopicReply;

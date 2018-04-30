import React from 'react';
import PropTypes from 'prop-types';
import { Card, List, Avatar } from 'antd';
import Markdown from 'react-markdown';
import styles from './TopicReply.scss';

const TopicReply = ({
  dataSource, total, current, pageSize, onReplyPageChange, onReplySizeChange,
}) => {
  return (
    <Card
      id="Topic__reply"
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
          <List.Item className={styles.content}>
            <List.Item.Meta
              avatar={<Avatar src={item.author.avatar_url} size="large" />}
              title={(
                <div id={item.id}>
                  {item.author.loginname}
                  <a href={`#${item.id}`}>
                    {`${key + 1 + ((current - 1) * pageSize)} 楼`}
                  </a>
                </div>
              )}
              description={
                <Markdown source={item.content} />
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

TopicReply.propTypes = {
  dataSource: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onReplyPageChange: PropTypes.func.isRequired,
  onReplySizeChange: PropTypes.func.isRequired,
};

export default TopicReply;

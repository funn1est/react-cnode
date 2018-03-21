import React from 'react';
import { List, Avatar } from 'antd';
import styles from './TopicReply.scss';

class TopicReply extends React.PureComponent {
  render() {
    const { data } = this.props;
    return (
      <List
        className={styles.container}
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.author.avatar_url} />}
              title={item.author.loginname}
              description={
                <div
                  className={styles.content}
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              }
            />
          </List.Item>
        )}
      />
    );
  }
}

export default TopicReply;

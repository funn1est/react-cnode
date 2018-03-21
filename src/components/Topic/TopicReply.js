import React from 'react';
import PropTypes from 'prop-types';
import { List, Avatar } from 'antd';
import styles from './TopicReply.scss';

class TopicReply extends React.PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string,
        author: PropTypes.shape({
          avatar_url: PropTypes.string,
          loginname: PropTypes.string,
        }),
      }),
    ),
    loading: PropTypes.bool.isRequired,
  };

  render() {
    const { data, loading } = this.props;
    return (
      <List
        className={styles.container}
        loading={loading}
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

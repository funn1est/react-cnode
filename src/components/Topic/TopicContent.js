import React from 'react';
import { Card } from 'antd';
import styles from './TopicContent.scss';

class TopicContent extends React.PureComponent {
  render() {
    const { loading, title, content } = this.props;
    return (
      <Card className={styles.container} loading={loading} title={title}>
        <div
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Card>
    );
  }
}

export default TopicContent;

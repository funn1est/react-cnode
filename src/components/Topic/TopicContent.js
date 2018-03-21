import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import styles from './TopicContent.scss';

class TopicContent extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    title: PropTypes.string,
    content: PropTypes.string,
  };

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

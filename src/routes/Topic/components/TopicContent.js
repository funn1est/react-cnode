import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'antd';
import Markdown from 'react-markdown';
import styles from './TopicContent.scss';

class TopicContent extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    title: PropTypes.string,
    content: PropTypes.string,
    onClickEdit: PropTypes.func.isRequired,
  };

  render() {
    const { loading, title, content, onClickEdit } = this.props;
    return (
      <Card
        loading={loading}
        title={title}
        extra={(
          <Button
            type="primary"
            icon="edit"
            shape="circle"
            onClick={onClickEdit}
          />
        )}
        className={styles.container}
      >
        <Markdown source={content} />
      </Card>
    );
  }
}

export default TopicContent;

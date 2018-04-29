import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'antd';
import Markdown from 'react-markdown';
import styles from './TopicContent.scss';

class TopicContent extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    renderEdit: PropTypes.bool.isRequired,
    title: PropTypes.string,
    content: PropTypes.string,
    onClickEdit: PropTypes.func.isRequired,
  };

  render() {
    const { loading, title, content, renderEdit, onClickEdit } = this.props;
    return (
      <Card
        className={styles.container}
        loading={loading}
        title={title}
        extra={renderEdit && (
          <Button
            type="primary"
            icon="edit"
            shape="circle"
            onClick={onClickEdit}
          />
        )}
      >
        <Markdown source={content} />
      </Card>
    );
  }
}

export default TopicContent;

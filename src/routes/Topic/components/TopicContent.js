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
        actions={renderEdit && [
          (
            <Button
              icon="edit"
              onClick={onClickEdit}
            >
              编辑话题
            </Button>
          ),
        ]}
      >
        <Markdown source={content} />
      </Card>
    );
  }
}

export default TopicContent;

import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'antd';
import Markdown from 'react-markdown';
import { userUtils } from 'utils';
import styles from './TopicContent.scss';

class TopicContent extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    authorId: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    onClickEdit: PropTypes.func.isRequired,
  };

  render() {
    const { loading, authorId, title, content, onClickEdit } = this.props;
    const user = userUtils.getUser() || {};
    return (
      <Card
        className={styles.container}
        loading={loading}
        title={title}
        extra={authorId === user.id && (
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

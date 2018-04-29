import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Avatar } from 'antd';
import Markdown from 'react-markdown';
import styles from './TopicContent.scss';

const TopicContent = ({
  loading, topicData, renderEdit, onClickEdit,
}) => (
  <Card
    className={styles.container}
    loading={loading}
    title={(
      <Card.Meta
        avatar={<Avatar
          src={(topicData.author || {}).avatar_url}
          size="large"
        />}
        title={topicData.title}
      />
    )}
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
    <Markdown source={topicData.content} />
  </Card>
);

TopicContent.propTypes = {
  loading: PropTypes.bool.isRequired,
  topicData: PropTypes.object.isRequired,
  renderEdit: PropTypes.bool.isRequired,
  onClickEdit: PropTypes.func.isRequired,
};

export default TopicContent;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { timeUtils } from 'utils';
import { Card, Button, Avatar, Switch, Icon, Tag, Divider } from 'antd';
import Markdown from 'react-markdown';
import styles from './TopicContent.scss';

const TopicContent = ({
  loading, loadingCollect, topicData,
  renderCollect, renderEdit,
  onClickCollect, onClickEdit,
}) => {
  const author = topicData.author || {};
  const renderTag = (key, isTop, isGood) => {
    const Tabs = {
      top: <Tag color="red">置顶</Tag>,
      good: <Tag color="green">精华</Tag>,
      share: <Tag color="blue">分享</Tag>,
      ask: <Tag color="orange">问答</Tag>,
      job: <Tag color="geekblue">招聘</Tag>,
    };
    if (isTop) {
      return Tabs.top;
    } else if (isGood) {
      return Tabs.good;
    } else {
      return Tabs[key];
    }
  };
  return (
    <Card
      className={styles.container}
      loading={loading}
      extra={renderCollect && (
        <div>
          收藏：
          <Switch
            loading={loadingCollect}
            checked={topicData.is_collect}
            onChange={onClickCollect}
            checkedChildren={<Icon type="check" />}
            unCheckedChildren={<Icon type="cross" />}
          />
        </div>
      )}
      title={(
        <Card.Meta
          avatar={<Avatar
            src={author.avatar_url}
            size="large"
          />}
          title={
            <div>
              {renderTag(topicData.tab, topicData.top, topicData.good)}
              {topicData.title}
            </div>
          }
          description={
            <div className={styles.description}>
              <Link to={`/user/${author.loginname}`}>
                <Tag color="purple">{author.loginname}</Tag>
              </Link>
              <Divider className={styles.divider} type="vertical" />
              <span className={styles.createTime}>
                发布于：{timeUtils.fromNow(topicData.create_at)}
              </span>
              <Divider className={styles.divider} type="vertical" />
              <span className={styles.visitCount}>
                浏览数：{topicData.visit_count}
              </span>
            </div>
          }
        />
      )}
      actions={renderEdit && [
        <Button
          icon="edit"
          onClick={onClickEdit}
        >
          编辑话题
        </Button>,
      ]}
    >
      <Markdown source={topicData.content} />
    </Card>
  );
};

TopicContent.propTypes = {
  loading: PropTypes.bool.isRequired,
  loadingCollect: PropTypes.bool.isRequired,
  topicData: PropTypes.object.isRequired,
  renderCollect: PropTypes.bool.isRequired,
  renderEdit: PropTypes.bool.isRequired,
  onClickCollect: PropTypes.func.isRequired,
  onClickEdit: PropTypes.func.isRequired,
};

export default TopicContent;

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { timeUtils } from 'utils';
import { Card, Button, Avatar, Switch, Icon, Tag, Divider } from 'antd';
import { collectTopic } from '../TopicRedux';
import { editTopic } from '../../Post/PostRedux';
import styles from './TopicContent.scss';
import Tiptap from '../../../components/Tiptap';

export class TopicContentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onClickCollect = this.onClickCollect.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
  }

  onClickCollect(isCollect) {
    const {
      currentUser: { token },
      match: {
        params: { id },
      },
    } = this.props;
    this.props.collectTopic(isCollect, token, id);
  }

  onClickEdit() {
    const { topicData } = this.props;
    const id = topicData.get('id');
    const tab = topicData.get('tab');
    const title = topicData.get('title');
    const content = topicData.get('content');
    this.props.editTopic({ id, tab, title, content });
    this.props.history.push(`/topic/${id}/edit`);
  }

  renderTag = (key, isTop, isGood) => {
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

  render() {
    const { loading, topicData, currentUser } = this.props;

    const renderCollect = currentUser.id !== undefined;
    const renderEdit = currentUser.id === topicData.get('author_id');
    const author = topicData.get('author') || Map({});

    return (
      <Card
        className={styles.container}
        loading={loading}
        extra={
          renderCollect && (
            <TopicContentCollect onClickCollect={this.onClickCollect} />
          )
        }
        title={
          <Card.Meta
            avatar={<Avatar src={author.get('avatar_url')} size="large" />}
            title={
              <div>
                {this.renderTag(
                  topicData.get('tab'),
                  topicData.get('top'),
                  topicData.get('good'),
                )}
                {topicData.get('title')}
              </div>
            }
            description={
              <div className={styles.description}>
                <Link to={`/user/${author.get('loginname')}`}>
                  <Tag color="green">{author.get('loginname')}</Tag>
                </Link>
                <Divider className={styles.divider} type="vertical" />
                <span className={styles.createTime}>
                  发布于：{timeUtils.fromNow(topicData.get('create_at'))}
                </span>
                <Divider className={styles.divider} type="vertical" />
                <span className={styles.visitCount}>
                  浏览数：{topicData.get('visit_count')}
                </span>
              </div>
            }
          />
        }
        actions={
          renderEdit && [
            <Button icon="edit" onClick={this.onClickEdit}>
              编辑话题
            </Button>,
          ]
        }
      >
        <Tiptap content={topicData.get('content')} />
      </Card>
    );
  }
}

const Collect = ({ loadingCollect, isCollect, onClickCollect }) => {
  return (
    <div>
      收藏：
      <Switch
        loading={loadingCollect}
        checked={isCollect}
        onChange={onClickCollect}
        checkedChildren={<Icon type="star" />}
        unCheckedChildren={<Icon type="star-o" />}
      />
    </div>
  );
};

const TopicContentCollect = connect((state) => ({
  loadingCollect: state.getIn(['topic', 'loadingCollect']),
  isCollect: state.getIn(['topic', 'isCollect']),
}))(Collect);

TopicContentComponent.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),

  loading: PropTypes.bool,
  topicData: PropTypes.object,
  currentUser: PropTypes.object,
  collectTopic: PropTypes.func,
  editTopic: PropTypes.func,
};

Collect.propTypes = {
  loadingCollect: PropTypes.bool.isRequired,
  isCollect: PropTypes.bool.isRequired,
  onClickCollect: PropTypes.func.isRequired,
};

export default withRouter(
  connect(
    (state) => ({
      loading: state.getIn(['topic', 'loading']),
      topicData: state.getIn(['topic', 'topicData']),
      currentUser: state.getIn(['login', 'userData']),
    }),
    { collectTopic, editTopic },
  )(TopicContentComponent),
);

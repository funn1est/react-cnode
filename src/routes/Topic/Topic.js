import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ReplyService } from 'services';
import { arrayUtils, toastUtils, notificationUtils } from 'utils';
import Exception from 'components/Exception';
import { TopicContent, TopicReply, TopicEditor } from './components';
import { getTopicData, collectTopic, upReply } from './TopicRedux';
import { editTopic } from '../Post/PostRedux';
import '../../styles/GithubMarkdown.scss';

@withRouter
@connect(
  state => ({
    loading: state.getIn(['topic', 'loading']),
    loadingCollect: state.getIn(['topic', 'loadingCollect']),
    error: state.getIn(['topic', 'error']),

    topicData: state.getIn(['topic', 'topicData']),
    user: state.getIn(['login', 'userData']),
  }),
  dispatch => ({
    getTopicData: bindActionCreators(getTopicData, dispatch),
    collectTopic: bindActionCreators(collectTopic, dispatch),
    upReply: bindActionCreators(upReply, dispatch),
    editTopic: bindActionCreators(editTopic, dispatch),
  }),
)
class Topic extends React.PureComponent {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,

    getTopicData: PropTypes.func,
    collectTopic: PropTypes.func,
    upReply: PropTypes.func,
    editTopic: PropTypes.func,
    topicData: PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.string,
      replies: PropTypes.array,
    }),
    user: PropTypes.shape({
      id: PropTypes.string,
      token: PropTypes.string,
    }),
    loading: PropTypes.bool,
    loadingCollect: PropTypes.bool,
    error: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      replyPage: 1,
      replySize: 10,

      replyLoading: false,
      contentValue: '',
      replyId: '',
    };
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onReplyPageChange = this.onReplyPageChange.bind(this);
    this.onReplySizeChange = this.onReplySizeChange.bind(this);
    this.onEditorChange = this.onEditorChange.bind(this);
    this.onClickAddReply = this.onClickAddReply.bind(this);
  }

  componentDidMount() {
    this.getTopicData();
  }

  onClickCollect = isCollect => {
    const {
      user: { token },
      match: {
        params: { id },
      },
    } = this.props;
    this.props.collectTopic(isCollect, token, id);
  };

  onClickEdit() {
    const {
      topicData: { id, tab, title, content },
    } = this.props;
    this.props.editTopic({ id, tab, title, content });
    this.props.history.push(`/topic/${id}/edit`);
  }

  onClickUp = (id, key) => {
    const {
      user: { token },
    } = this.props;
    if (token !== undefined) {
      this.props.upReply(token, id, key);
    }
  };

  onEditorChange(value) {
    this.setState({
      contentValue: value,
    });
  }

  onReplyPageChange = replyPage => {
    this.setState(
      {
        replyPage,
      },
      () => {
        this.jumpToAnchor('topic__reply');
      },
    );
  };

  onReplySizeChange = (replyPage, replySize) => {
    this.setState(
      {
        replyPage,
        replySize,
      },
      () => {
        this.jumpToAnchor('topic__reply');
      },
    );
  };

  async onClickAddReply() {
    const {
      user: { token },
      topicData: { id: topicId },
    } = this.props;
    const { contentValue: content } = this.state;

    if (content.length === 0) {
      notificationUtils.error('请输入回复后再提交');
    }
    this.setState({
      replyLoading: true,
    });
    try {
      const {
        data: { success, reply_id: replyId },
      } = await ReplyService.addReply({ token, topicId, content });
      if (success) {
        this.setState({
          contentValue: '',
          replyId,
          replyLoading: false,
        });
        toastUtils.success('回复成功');
        this.getTopicData();
      } else {
        notificationUtils.warning('服务器出小差了，请稍后再试');
        this.setState({
          replyLoading: false,
        });
      }
    } catch (e) {
      // ReplyService.addReply() interrupt
      if (!(e instanceof TypeError)) {
        notificationUtils.warning('网络出小差了，请稍后再试');
      } else {
        console.log(e);
      }
      this.setState({
        replyLoading: false,
      });
    }
  }

  getTopicData = () => {
    const {
      match: {
        params: { id },
      },
      user: { token },
    } = this.props;
    const { replyPage, replySize, replyId } = this.state;
    this.props.getTopicData(id, token, data => {
      if (replyId.length !== 0) {
        if (replyPage * replySize < data.replies.length) {
          // jump to the reply just submitted
          this.setState(
            {
              replyPage: Math.ceil(data.replies.length / replySize),
            },
            () => {
              this.jumpToAnchor(replyId);
            },
          );
        } else {
          // jump to the reply just submitted
          this.jumpToAnchor(replyId);
        }
      }
    });
  };

  jumpToAnchor = href => {
    location.href = `#${href}`;
  };

  render() {
    const { user, topicData, loading, error, loadingCollect } = this.props;
    const { replyPage, replySize, contentValue, replyLoading } = this.state;
    const d = arrayUtils.splitArray(topicData.replies || [], replySize);
    return (
      <React.Fragment>
        {!error ? (
          <React.Fragment>
            <TopicContent
              loading={loading}
              loadingCollect={loadingCollect}
              topicData={topicData}
              renderCollect={user.id !== undefined}
              renderEdit={user.id === topicData.author_id}
              onClickCollect={this.onClickCollect}
              onClickEdit={this.onClickEdit}
            />
            {topicData.replies &&
              topicData.replies.length > 0 && (
                <TopicReply
                  dataSource={d[replyPage - 1] || []}
                  total={topicData.replies.length}
                  current={replyPage}
                  pageSize={replySize}
                  onClickUp={this.onClickUp}
                  onReplyPageChange={this.onReplyPageChange}
                  onReplySizeChange={this.onReplySizeChange}
                />
              )}
            {user.id !== undefined && (
              <TopicEditor
                value={contentValue}
                loading={replyLoading}
                onEditorChange={this.onEditorChange}
                onClickReply={this.onClickAddReply}
              />
            )}
          </React.Fragment>
        ) : (
          <Exception />
        )}
      </React.Fragment>
    );
  }
}

export default Topic;

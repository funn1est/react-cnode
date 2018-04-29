import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ReplyService } from 'services';
import { toastUtils, notificationUtils } from 'utils';
import { TopicContent, TopicReply, TopicEditor } from './components';
import { getTopicData } from './TopicRedux';
import { editTopic } from '../Post/PostRedux';
import '../../styles/Markdown.scss';

@withRouter
@connect(
  state => ({
    user: state.login.userData,
    loading: state.topic.loading,
    topicData: state.topic.topicData,
  }),
  dispatch => ({
    getTopicData: bindActionCreators(getTopicData, dispatch),
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
  };

  constructor(props) {
    super(props);
    this.state = {
      replyLoading: false,
      contentValue: '',
      replyId: '',
    };
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onEditorChange = this.onEditorChange.bind(this);
    this.onClickReply = this.onClickReply.bind(this);
  }

  componentDidMount() {
    this.getTopicData();
  }

  onClickEdit() {
    const { topicData: { id, tab, title, content } } = this.props;
    this.props.editTopic({ id, tab, title, content });
    this.props.history.push(`/topic/${id}/edit`);
  }

  onEditorChange(value) {
    this.setState({
      contentValue: value,
    });
  }

  async onClickReply() {
    const { user: { token }, topicData: { id: topicId } } = this.props;
    const { contentValue: content } = this.state;

    if (content.length === 0) {
      notificationUtils.error('请输入回复后再提交');
    }
    this.setState({
      replyLoading: true,
    });
    try {
      const { data: { success, reply_id: replyId } } =
        await ReplyService.addReply({ token, topicId, content });
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
    const { match: { params: { id } } } = this.props;
    const { replyId } = this.state;
    this.props.getTopicData(id, () => {
      if (replyId.length > 0) {
        // jump to the reply just submitted
        window.location.hash = replyId;
      }
    });
  };

  render() {
    const { user, topicData, loading } = this.props;
    const { contentValue, replyLoading } = this.state;
    return (
      <React.Fragment>
        <TopicContent
          key="TopicContent"
          loading={loading}
          topicData={topicData}
          renderEdit={user.id === topicData.author_id}
          onClickEdit={this.onClickEdit}
        />
        {
          topicData.replies && topicData.replies.length > 0 && (
            <TopicReply
              key="TopicReply"
              loading={loading}
              data={topicData.replies}
            />
          )
        }
        {
          user.id !== undefined && (
            <TopicEditor
              key="TopicEditor"
              value={contentValue}
              loading={replyLoading}
              onEditorChange={this.onEditorChange}
              onClickReply={this.onClickReply}
            />
          )
        }
      </React.Fragment>
    );
  }
}

export default Topic;

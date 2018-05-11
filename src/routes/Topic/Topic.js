import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ReplyService } from 'services';
import { toastUtils, notificationUtils } from 'utils';
import Exception from 'components/Exception';
import { TopicContent, TopicReplies, TopicEditor } from './components';
import { getTopicData, upReply } from './TopicRedux';
import '../../styles/GithubMarkdown.scss';

export class TopicComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      replyPage: 1,
      replySize: 10,

      replyLoading: false,
      contentValue: '',
      replyId: '',
    };
    this.onReplyPageChange = this.onReplyPageChange.bind(this);
    this.onReplySizeChange = this.onReplySizeChange.bind(this);
    this.onClickUp = this.onClickUp.bind(this);
    this.onEditorChange = this.onEditorChange.bind(this);
    this.onClickAddReply = this.onClickAddReply.bind(this);
  }

  componentDidMount() {
    this.getTopicData();
  }

  onReplyPageChange(replyPage) {
    this.setState(
      {
        replyPage,
      },
      () => {
        this.jumpToAnchor('topic__reply');
      },
    );
  }

  onReplySizeChange(replyPage, replySize) {
    this.setState(
      {
        replyPage,
        replySize,
      },
      () => {
        this.jumpToAnchor('topic__reply');
      },
    );
  }

  onClickUp(replyId) {
    const {
      currentUser: { token },
    } = this.props;
    if (token !== undefined) {
      this.props.upReply(token, replyId);
    }
  }

  onEditorChange(value) {
    this.setState({
      contentValue: value,
    });
  }

  async onClickAddReply() {
    const { contentValue: content } = this.state;
    if (content.length === 0) {
      notificationUtils.error('请输入回复后再提交');
      return;
    }

    const {
      currentUser: { token },
      match: {
        params: { id: topicId },
      },
    } = this.props;

    this.setState({
      replyLoading: true,
    });
    try {
      const {
        data: { success, reply_id: replyId },
      } = await ReplyService.addReply(token, topicId, content);
      if (success) {
        toastUtils.success('回复成功');
        this.setState(
          {
            contentValue: '',
            replyId,
            replyLoading: false,
          },
          () => {
            this.getTopicData();
          },
        );
      } else {
        notificationUtils.warning('服务器出小差了，请稍后再试');
        this.setState({
          replyLoading: false,
        });
      }
    } catch (e) {
      notificationUtils.warning('网络出小差了，请稍后再试');
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
      currentUser: { token },
    } = this.props;

    const { replyPage, replySize, replyId } = this.state;
    this.props.getTopicData(id, token, repliesLen => {
      if (replyId.length !== 0) {
        if (replyPage * replySize < repliesLen) {
          // jump to the reply just submitted
          this.setState(
            {
              replyPage: Math.ceil(repliesLen / replySize),
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
    const { currentUser, error } = this.props;
    const { replyPage, replySize, contentValue, replyLoading } = this.state;

    if (error) {
      return <Exception />;
    }
    return (
      <React.Fragment>
        <TopicContent />
        <TopicReplies
          current={replyPage}
          pageSize={replySize}
          onReplyPageChange={this.onReplyPageChange}
          onReplySizeChange={this.onReplySizeChange}
          onClickUp={this.onClickUp}
        />
        {currentUser.id !== undefined && (
          <TopicEditor
            value={contentValue}
            loading={replyLoading}
            onEditorChange={this.onEditorChange}
            onClickReply={this.onClickAddReply}
          />
        )}
      </React.Fragment>
    );
  }
}

TopicComponent.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,

  getTopicData: PropTypes.func,
  upReply: PropTypes.func,
  currentUser: PropTypes.shape({
    id: PropTypes.string,
    token: PropTypes.string,
  }),
  error: PropTypes.bool,
};

export default withRouter(
  connect(
    state => ({
      error: state.getIn(['topic', 'error']),
      currentUser: state.getIn(['login', 'userData']),
    }),
    {
      getTopicData,
      upReply,
    },
  )(TopicComponent),
);

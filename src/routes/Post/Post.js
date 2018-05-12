import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Button } from 'antd';
import { TopicsService } from 'services';
import { notificationUtils, toastUtils, regexUtils } from 'utils';
import Title from 'components/Title';
import MarkdownEditor from 'components/MarkdownEditor';
import { PostTab, PostTitle } from './components';
import styles from './Post.scss';

export class PostComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '发布话题',
      isPost: true,
      loading: false,
      tab: 'dev',
      titleValue: '',
      contentValue: '',
    };
    this.onTabChange = this.onTabChange.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onEditorChange = this.onEditorChange.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
  }

  componentDidMount() {
    this.getEditPostValue();
  }

  onTabChange({ target: { value } }) {
    this.setState({
      tab: value,
    });
  }

  onTitleChange({ target: { value } }) {
    this.setState({
      titleValue: value,
    });
  }

  onEditorChange(value) {
    this.setState({
      contentValue: value,
    });
  }

  async onClickSubmit() {
    const {
      isPost,
      titleValue: title,
      tab,
      contentValue: content,
    } = this.state;
    if (title.length === 0) {
      notificationUtils.error('请输入文章标题');
      return;
    }
    if (content.length === 0) {
      notificationUtils.error('请输入文章内容');
      return;
    }

    this.setState({
      loading: true,
    });
    try {
      let data;
      if (isPost) {
        data = await TopicsService.postTopics(title, tab, content);
      } else {
        const { id } = this.props;
        data = await TopicsService.postTopics(title, tab, content, id);
      }
      const {
        data: { success, topic_id: topicId },
      } = data;
      this.setState({
        loading: false,
      });
      if (success) {
        toastUtils.success('发布成功');
        this.props.history.push(`/topic/${topicId}`);
      } else {
        notificationUtils.warning('服务器出小差了，请稍后再试');
      }
    } catch (e) {
      this.setState({
        loading: false,
      });
    }
  }

  getEditPostValue = () => {
    const {
      location: { pathname },
    } = this.props;
    if (regexUtils.editRouteRegex.test(pathname)) {
      const { tab, title, content } = this.props;
      this.setState({
        title: '编辑话题',
        isPost: false,
        tab,
        titleValue: title,
        contentValue: content,
      });
    }
  };

  render() {
    const { title, loading, titleValue, contentValue } = this.state;
    return (
      <Fragment>
        <Title title={title} />
        <Card className={styles.container}>
          <div className={styles.tab}>
            板块：
            <PostTab onTabChange={this.onTabChange} />
          </div>
          <PostTitle value={titleValue} onTitleChange={this.onTitleChange} />
          <MarkdownEditor
            value={contentValue}
            onEditorChange={this.onEditorChange}
          />
          <div className={styles.button}>
            <Button
              type="primary"
              icon="share-alt"
              loading={loading}
              onClick={this.onClickSubmit}
            >
              发布话题
            </Button>
          </div>
        </Card>
      </Fragment>
    );
  }
}

PostComponent.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),

  id: PropTypes.string,
  tab: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
};

export default withRouter(
  connect(state => ({
    id: state.getIn(['edit', 'id']),
    tab: state.getIn(['edit', 'tab']),
    title: state.getIn(['edit', 'title']),
    content: state.getIn(['edit', 'content']),
  }))(PostComponent),
);

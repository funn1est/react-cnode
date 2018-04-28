import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TopicContent, TopicReply } from './components';
import { getTopicData } from './TopicRedux';
import { editTopic } from '../Post/PostRedux';
import '../../styles/Markdown.scss';

@withRouter
@connect(
  state => ({
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
    loading: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.onClickEdit = this.onClickEdit.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.props.getTopicData(id);
  }

  onClickEdit() {
    const { topicData: { id, tab, title, content } } = this.props;
    this.props.editTopic({ tab, title, content });
    this.props.history.push(`/topic/${id}/edit`);
  }

  render() {
    const { topicData, loading } = this.props;
    return [
      <TopicContent
        key="TopicContent"
        loading={loading}
        title={topicData.title}
        content={topicData.content}
        onClickEdit={this.onClickEdit}
      />,
      <TopicReply
        key="TopicReply"
        loading={loading}
        data={topicData.replies}
      />,
    ];
  }
}

export default Topic;

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TopicComponent from './components';
import { getTopicData } from './TopicRedux';
import styles from './Topic.scss';

const { TopicContent, TopicReply } = TopicComponent;

@connect(
  state => ({
    loading: state.topic.loading,
    topicData: state.topic.topicData,
  }),
  dispatch => ({
    getTopicData: bindActionCreators(getTopicData, dispatch),
  }),
)
class Topic extends React.PureComponent {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
    getTopicData: PropTypes.func,
    topicData: PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.string,
      replies: PropTypes.array,
    }),
    loading: PropTypes.bool,
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.props.getTopicData(id);
  }

  render() {
    const { topicData, loading } = this.props;
    return (
      <div className={styles.container}>
        <TopicContent
          loading={loading}
          title={topicData.title}
          content={topicData.content}
        />
        <TopicReply loading={loading} data={topicData.replies} />
      </div>
    );
  }
}

export default Topic;

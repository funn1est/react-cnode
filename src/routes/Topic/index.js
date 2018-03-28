import React from 'react';
import PropTypes from 'prop-types';
import { TopicComponent } from 'components';
import { TopicsService } from 'services';
import styles from './index.scss';

const { TopicContent, TopicReply } = TopicComponent;

class Topic extends React.PureComponent {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      topicData: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getTopicData();
  }

  getTopicData = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({
      loading: true,
    });
    try {
      const { data: { data } } =
        await TopicsService.getTopic(id, { mdrender: 'true' });
      this.setState({
        topicData: data,
        loading: false,
      });
    } catch (e) {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const { topicData, loading } = this.state;
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

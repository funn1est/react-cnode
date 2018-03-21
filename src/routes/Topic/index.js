import React from 'react';
import { TopicComponent } from 'components';
import { TopicsService } from 'services';
import styles from './index.scss';

const { TopicContent, TopicReply } = TopicComponent;

class Topic extends React.PureComponent {
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

  getTopicData = () => {
    const { match: { params: { id } } } = this.props;
    this.setState({
      loading: true,
    });
    TopicsService.getTopic(id, { mdrender: true })
      .then(({ data: { data } }) => {
        this.setState({
          topicData: data,
          loading: false,
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
        });
      });
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
        <TopicReply data={topicData.replies} />
      </div>
    );
  }
}

export default Topic;

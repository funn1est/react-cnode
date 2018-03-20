import React from 'react';
import { List, Card, Avatar } from 'antd';
import { TopicsService } from 'services';
import styles from './index.scss';

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
      <div style={{ width: '900px' }}>
        <Card loading={loading} title={topicData.title}>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: topicData.content }}
          />
        </Card>
        <List
          dataSource={topicData.replies}
          style={{ background: 'white' }}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.author.avatar_url} />}
                title={item.author.loginname}
                description={
                  <div
                    className={styles.reply}
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                }
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default Topic;

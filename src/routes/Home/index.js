import React from 'react';
import { Link } from 'react-router-dom';
import { List, Avatar, Card, Divider, Tag } from 'antd';
import { TopicsService } from 'services';
import styles from './index.scss';

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      topicsData: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getTopicsData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tab !== this.props.tab) {
      this.getTopicsData();
    }
  }

  getTopicsData = () => {
    const { tab } = this.props;
    this.setState({
      loading: true,
    });
    TopicsService.getTopics({
      tab,
      page: 1,
      limit: 20,
      mdrender: 'true',
    })
      .then(({ data: { data } }) => {
        this.setState({
          topicsData: data,
          loading: false,
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
        });
      });
  };

  renderTag = (item) => {
    const Tabs = {
      good: <Tag color="blue">精华</Tag>,
      share: <Tag color="blue">分享</Tag>,
      ask: <Tag color="blue">问答</Tag>,
      job: <Tag color="blue">招聘</Tag>,
    };
    return Tabs[item];
  };

  render() {
    const { topicsData, loading } = this.state;
    return (
      <List
        className={styles.container}
        size="large"
        grid={{ gutter: 16, column: 1 }}
        dataSource={topicsData}
        loading={loading}
        renderItem={item => (
          <List.Item
            key={item.id}
          >
            <Card>
              <Card.Meta
                title={
                  <div className={styles.item}>
                    <div>
                      <Avatar
                        size="small"
                        shape="square"
                        src={item.author.avatar_url}
                      />
                      {item.author.loginname}
                    </div>
                    <div>
                      {this.renderTag(item.tab)}
                      <Link
                        to={{ pathname: `/topic/${item.id}` }}
                      >
                        {item.title}
                      </Link>
                    </div>
                  </div>
                }
                description={
                  <div>
                    <div className={styles.content}>
                      {item.content.replace(/<[^>]*>/g, '')}
                    </div>
                    <div>
                      {`阅读数:${item.visit_count}`}
                      <Divider type="vertical" />
                      {`${item.reply_count}条评论`}
                    </div>
                  </div>
                }
              />
            </Card>
          </List.Item>
        )}
      />
    );
  }
}

export default Home;

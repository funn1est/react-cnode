import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List, Avatar, Card, Divider, Tag } from 'antd';
import { getTopicsData } from './HomeRedux';
import styles from './index.scss';

@connect(
  state => ({
    tab: state.basic.tab,
    loading: state.home.loading,
    topicsData: state.home.topicsData,
  }),
  dispatch => ({
    getTopicsData: bindActionCreators(getTopicsData, dispatch),
  }),
)
class Home extends React.PureComponent {
  componentDidMount() {
    const { tab } = this.props;
    this.props.getTopicsData(tab);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tab !== this.props.tab) {
      const { tab } = this.props;
      this.props.getTopicsData(tab);
    }
  }

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
    const { topicsData, loading } = this.props;
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
                      {item.content.replace(/<[^>]*>/g, '').slice(0, 300)}
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

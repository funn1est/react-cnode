import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { List, Avatar, Card, Divider, Tag } from 'antd';
import styles from './HomeContent.scss';

class HomeContent extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    topicsData: PropTypes.array,
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
    const { loading, topicsData } = this.props;
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

export default HomeContent;

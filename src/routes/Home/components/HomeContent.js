import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, Avatar, Card, Divider, Tag } from 'antd';
import { timeUtils } from 'utils';
import styles from './HomeContent.scss';

@connect(
  state => ({
    tab: state.basic.tab,
    loading: state.home.loading,
    topicsData: state.home.topicsData,
  }),
)
class HomeContent extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    topicsData: PropTypes.array,
  };

  renderTag = (key, isTop, isGood) => {
    const { tab } = this.props;
    const Tabs = {
      top: <Tag color="red">置顶</Tag>,
      good: <Tag color="green">精华</Tag>,
      share: <Tag color="blue">分享</Tag>,
      ask: <Tag color="orange">问答</Tag>,
      job: <Tag color="geekblue">招聘</Tag>,
    };
    if (isTop) {
      return Tabs.top;
    } else if (isGood && !Object.is(tab, 'good')) {
      return Tabs.good;
    } else if (Object.is(tab, 'all')) {
      return Tabs[key];
    } else {
      return null;
    }
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
                      {this.renderTag(item.tab, item.top, item.good)}
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
                      <Divider type="vertical" />
                      {timeUtils.fromNow(item.last_reply_at)}
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

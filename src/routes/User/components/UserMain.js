import React from 'react';
import { Card, List, Avatar } from 'antd';

const tabList = [
  {
    key: 'topics',
    tab: '最近创建的话题',
  }, {
    key: 'replies',
    tab: '最近参与的话题',
  },
];

class UserMain extends React.Component {
  state = {
    key: 'topics',
  };

  onTabChange = (key) => {
    this.setState({ key });
  };

  renderContent = () => {
    const { contentList } = this.props;
    const { key } = this.state;
    if (contentList[key].length === 0) {
      return <div>无话题</div>;
    } else {
      return (
        <List
          dataSource={contentList[key]}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.author.avatar_url} />}
                title={<a href={`/topic/${item.id}`}>{item.title}</a>}
              />
            </List.Item>
          )}
        />
      );
    }
  };

  render() {
    const { loading, contentList } = this.props;
    console.log(contentList);
    return (
      <Card
        loading={loading}
        tabList={tabList}
        onTabChange={key => this.onTabChange(key)}
      >
        {this.renderContent()}
      </Card>
    );
  }
}

export default UserMain;

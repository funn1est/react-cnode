import React from 'react';
import { Card } from 'antd';
import { shallow, render } from 'enzyme';
import UserMain, { UserMainContent } from '../UserMain';

describe('<UserMain />', () => {
  let wrapper;
  const props = {
    loading: false,
    dataList: {
      topics: ['topics'],
      replies: ['replies'],
    },
  };

  beforeEach(() => {
    wrapper = shallow(<UserMain {...props} />);
  });

  it('should render UserMain', () => {
    expect(wrapper.find(Card)).toHaveLength(1);
  });

  it('should contain UserMainContent with data topics', () => {
    expect(wrapper.contains(
      <UserMainContent data={props.dataList.topics} />),
    ).toBe(true);
  });

  it('should contain UserMainContent with data replies', () => {
    wrapper.setState({ key: 'replies' });
    expect(wrapper.contains(
      <UserMainContent data={props.dataList.replies} />),
    ).toBe(true);
  });

  it('should change state when call onTabChange', () => {
    wrapper.instance().onTabChange('good');
    expect(wrapper.state()).toHaveProperty('key', 'good');
  });
});

describe('<UserMainContent />', () => {
  let wrapper;
  const data = [
    {
      id: '1',
      author: {
        loginname: 'user1',
        avatar_url: '//',
      },
      title: 'title1',
      last_reply_at: '2018-04-09T01:44:42.394Z',
    },
    {
      id: '2',
      author: {
        loginname: 'user2',
        avatar_url: '//',
      },
      title: 'title2',
      last_reply_at: '2018-04-11T05:55:39.235Z',
    },
  ];

  it('should render none when data length is 0', () => {
    wrapper = shallow(<UserMainContent data={[]} />);
    expect(wrapper.contains(<div>无话题</div>)).toBe(true);
  });

  it('should render List when have data', () => {
    wrapper = render(<UserMainContent data={data} />);
    expect(wrapper.filter('.ant-list')).toHaveLength(1);
  });

  it('should render List Item when have data', () => {
    expect(wrapper.find('.ant-list-item')).toHaveLength(2);
  });
});

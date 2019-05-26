import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { fromJS, Map } from 'immutable';
import toJson from 'enzyme-to-json';
import MockDate from 'mockdate';
import configureStore from 'redux-mock-store';
import { Tag } from 'antd';
import TopicContent, {
  TopicContentComponent,
} from '../components/TopicContent';

MockDate.set(new Date('2018-05-21T16:00:00.000Z'));

describe('<TopicContent />', () => {
  it('should render correctly', () => {
    const initialState = Map({
      topic: fromJS({
        loading: false,
        loadingCollect: false,
        isCollect: false,

        topicData: {
          author_id: '007',
          author: {
            avatar_url: '//',
            loginname: 'admin',
          },
          id: '123',
          tab: 'dev',
          top: true,
          good: true,
          title: 'title',
          content: 'content',
          visit_count: 101,
          create_at: '2018-05-20T16:00:00.000Z',
        },
      }),
      login: Map({
        userData: {
          id: '007',
        },
      }),
    });

    const store = configureStore()(initialState);
    const tree = mount(
      <Provider store={store}>
        <MemoryRouter keyLength={0}>
          <TopicContent />
        </MemoryRouter>
      </Provider>,
    );
    expect(toJson(tree, { noKey: true, mode: 'deep' })).toMatchSnapshot();
  });
});

describe('<TopicContentComponent />', () => {
  let wrapper;
  const props = {
    match: {
      params: {
        id: '123456',
      },
    },

    currentUser: {
      id: '007',
      token: '123',
    },
    topicData: Map({
      author_id: '007',
      id: '123456',
      tab: 'dev',
      title: 'title',
      content: 'content',
    }),

    collectTopic: jest.fn(),
    editTopic: jest.fn(),
    history: {
      push: jest.fn(),
    },
  };

  beforeEach(() => {
    wrapper = shallow(<TopicContentComponent {...props} />);
  });

  it('should call collectTopic() when click collect', () => {
    wrapper.instance().onClickCollect(true);
    expect(props.collectTopic).toHaveBeenCalledTimes(1);
  });

  it('should call editTopic() and history.push() when click edit', () => {
    wrapper.instance().onClickEdit();
    expect(props.editTopic).toHaveBeenCalledTimes(1);
    expect(props.history.push).toHaveBeenCalledTimes(1);
  });

  it('should return good Tag', () => {
    const tag = wrapper.instance().renderTag('dev', false, true);
    expect(tag).toEqual(<Tag color="green">精华</Tag>);
  });
});

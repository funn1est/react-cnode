import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { fromJS, List } from 'immutable';
import toJson from 'enzyme-to-json';
import MockDate from 'mockdate';
import configureStore from 'redux-mock-store';
import { TopicReplies } from '../components';

MockDate.set(new Date('2018-05-21T16:00:00.000Z'));

describe('<TopicReplies />', () => {
  const mockStore = configureStore();
  const initialState = fromJS({
    topic: {
      topicData: {
        author: {
          loginname: 'admin',
        },
      },
      repliesData: {
        result: ['001', '002'],
        entities: {
          '001': {
            author: {
              loginname: 'admin',
              avatar_url: '//',
            },
            content: 'content',
            create_at: '2018-05-20T16:00:00.000Z',
          },
          '002': {
            author: {
              loginname: 'guest',
              avatar_url: '//',
            },
            content: 'guest content',
            create_at: '2018-05-20T16:00:00.000Z',
          },
        },
      },
    },
  });
  const props = {
    current: 1,
    pageSize: 10,
    onReplyPageChange: jest.fn(),
    onReplySizeChange: jest.fn(),
    onClickUp: jest.fn(),
  };

  it('should render correctly', () => {
    const store = mockStore(initialState);
    const tree = mount(
      <Provider store={store}>
        <MemoryRouter>
          <TopicReplies {...props} />
        </MemoryRouter>
      </Provider>,
    );
    expect(toJson(tree, { noKey: true, mode: 'deep' })).toMatchSnapshot();
  });

  it('should render null', () => {
    const store = mockStore(
      initialState.setIn(['topic', 'repliesData', 'result'], List([])),
    );
    const tree = mount(
      <Provider store={store}>
        <MemoryRouter>
          <TopicReplies {...props} />
        </MemoryRouter>
      </Provider>,
    );
    expect(toJson(tree, { noKey: true, mode: 'deep' })).toMatchSnapshot();
  });
});

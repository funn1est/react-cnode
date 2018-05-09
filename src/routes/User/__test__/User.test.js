import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Map } from 'immutable';
import thunk from 'redux-thunk';
import toJson from 'enzyme-to-json';
import MockDate from 'mockdate';
import configureStore from 'redux-mock-store';
import User from '../User';
import { UserTopics } from '../components';

MockDate.set(new Date('2018-05-21T16:00:00.000Z'));

const middleware = [thunk];

const userProps = {
  match: {
    params: {
      name: 'admin',
    },
  },
};

const userInitialState = Map({
  user: Map({
    loading: false,
    userData: {
      avatar_url: '//',
      collect: [{}, {}],
      create_at: '2018-05-20T16:00:00.000Z',
      githubUsername: 'admin',
      loginname: 'admin',
      score: 520,
      recent_topics: [
        {
          author: {
            avatar_url: '//',
            loginname: 'admin',
          },
          id: '007',
          title: 'title',
          last_reply_at: '2018-05-20T16:00:00.000Z',
        },
      ],
      recent_replies: [],
    },
    error: false,
  }),
  getUserData: jest.fn(),
});

const dataListMock = {
  collect: [],
  replies: [],
  topics: [],
};

describe('<User />', () => {
  it('should render correctly', () => {
    const store = configureStore(middleware)(userInitialState);
    const tree = mount(
      <MemoryRouter>
        <User store={store} {...userProps} />
      </MemoryRouter>,
    );
    expect(toJson(tree, { noKey: true, mode: 'deep' })).toMatchSnapshot();
  });

  it('should render <Exception />', () => {
    const initialState = userInitialState.setIn(['user', 'error'], true);
    const store = configureStore(middleware)(initialState);
    const tree = mount(
      <MemoryRouter>
        <User store={store} {...userProps} />
      </MemoryRouter>,
    );
    expect(toJson(tree, { noKey: true, mode: 'deep' })).toMatchSnapshot();
  });
});

describe('<UserTopics />', () => {
  it('should change state when call onTableChange()', () => {
    const wrapper = shallow(<UserTopics dataList={dataListMock} />);
    wrapper.instance().onTabChange('topics');
    expect(wrapper.state().key).toEqual('topics');
  });
});

import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Map } from 'immutable';
import thunk from 'redux-thunk';
import toJson from 'enzyme-to-json';
import MockDate from 'mockdate';
import configureStore from 'redux-mock-store';
import User, { UserComponent } from '../User';
import { UserTopics } from '../components';

MockDate.set(new Date('2018-05-21T16:00:00.000Z'));

describe('<User />', () => {
  const userProps = {
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
  };

  const middleware = [thunk];
  const mockStore = configureStore(middleware);

  const userInitialState = Map({
    user: Map(userProps),
    getUserData: jest.fn(),
  });

  const routeProps = {
    match: {
      params: {
        name: 'admin',
      },
    },
  };

  it('should render correctly', () => {
    const store = mockStore(userInitialState);
    const tree = mount(
      <MemoryRouter>
        <User store={store} {...routeProps} />
      </MemoryRouter>,
    );
    expect(toJson(tree, { noKey: true, mode: 'deep' })).toMatchSnapshot();
  });

  it('should render <Exception />', () => {
    const initialState = userInitialState.setIn(['user', 'error'], true);
    const store = mockStore(initialState);
    const tree = mount(
      <MemoryRouter>
        <User store={store} {...routeProps} />
      </MemoryRouter>,
    );
    expect(toJson(tree, { noKey: true, mode: 'deep' })).toMatchSnapshot();
  });

  it('should call getUser() when name change', () => {
    const props = {
      ...userProps,
      getUserData: jest.fn(),
    };
    const spy = jest.spyOn(UserComponent.prototype, 'getUser');
    const wrapper = shallow(<UserComponent {...routeProps} {...props} />);
    wrapper.setProps({
      match: {
        params: {
          name: 'guest',
        },
      },
    });
    expect(spy).toHaveBeenCalledTimes(2);
  });
});

describe('<UserTopics />', () => {
  it('should change state when call onTableChange()', () => {
    const dataListMock = {
      collect: [],
      replies: [],
      topics: [],
    };

    const wrapper = shallow(<UserTopics dataList={dataListMock} />);
    wrapper.instance().onTabChange('topics');
    expect(wrapper.state().key).toEqual('topics');
  });
});

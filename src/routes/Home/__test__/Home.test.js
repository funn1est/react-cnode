import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Map } from 'immutable';
import thunk from 'redux-thunk';
import toJson from 'enzyme-to-json';
import MockDate from 'mockdate';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import Home, { HomeComponent } from '../Home';
import HomeTopics from '../components/HomeTopics';
import HomeTopicTitle from '../components/HomeTopicTitle';

MockDate.set(new Date('2018-05-21T16:00:00.000Z'));
sinon.stub(Math, 'random').returns(0.16);

describe('<Home />', () => {
  const homeProps = {
    loading: false,
    loadingMore: false,
    hasMore: true,
    topicsData: [
      {
        author: {
          avatar_url: '//',
          loginname: 'admin',
        },
        content: 'content',
        title: 'title1',
        good: true,
        id: '123456789012345678901234',
        last_reply_at: '2018-05-20T16:00:00.000Z',
        reply_count: 100,
        tab: 'dev',
        top: true,
        visit_count: 1000,
      },
    ],
    error: false,
  };

  const middleware = [thunk];
  const mockStore = configureStore(middleware);

  const homeInitialState = Map({
    basic: Map({ tab: 'dev' }),
    home: Map(homeProps),
  });

  it('should render correctly', () => {
    const store = mockStore(homeInitialState);
    const tree = mount(
      <MemoryRouter>
        <Home store={store} />
      </MemoryRouter>,
    );
    expect(toJson(tree, { noKey: true, mode: 'deep' })).toMatchSnapshot();
  });

  it('should render <Exception />', () => {
    const initialState = homeInitialState.setIn(['home', 'error'], true);
    const store = mockStore(initialState);
    const tree = mount(
      <MemoryRouter>
        <Home store={store} />
      </MemoryRouter>,
    );
    expect(toJson(tree, { noKey: true, mode: 'deep' })).toMatchSnapshot();
  });

  it('should call getTopicsData() when tab change and not when tab same', () => {
    const props = {
      ...homeProps,
      tab: 'all',
      getTopicsData: jest.fn((a, b, fn) => fn()),
    };
    const wrapper = shallow(<HomeComponent {...props} />);
    wrapper.setProps({ tab: 'dev' });
    expect(props.getTopicsData).toHaveBeenCalledTimes(2);

    wrapper.setProps({ tab: 'dev' });
    expect(props.getTopicsData).toHaveBeenCalledTimes(2);
  });

  it('should call getMoreTopicsData() when scroll end and not when hasMore: false', async () => {
    const props = {
      ...homeProps,
      tab: 'all',
      getTopicsData: jest.fn((a, b, fn) => fn()),
      getMoreTopicsData: jest.fn((a, b, fn) => fn()),
    };
    const wrapper = shallow(<HomeComponent {...props} />);
    await wrapper
      .instance()
      .handleInfiniteOnLoad()
      .then(() => {
        expect(props.getMoreTopicsData).toHaveBeenCalledTimes(1);
      });

    wrapper.setProps({ hasMore: false });
    await wrapper
      .instance()
      .handleInfiniteOnLoad()
      .then(() => {
        expect(props.getMoreTopicsData).toHaveBeenCalledTimes(1);
      });
  });
});

describe('<HomeTopics />', () => {
  const homeTopicsProps = {
    tab: 'dev',
    loading: false,
    loadingMore: true,
    topicsData: [],
    handleInfiniteOnLoad: jest.fn(),
  };

  it('should render loading', () => {
    const tree = mount(<HomeTopics hasMore {...homeTopicsProps} />);
    expect(toJson(tree, { noKey: true, mode: 'deep' })).toMatchSnapshot();
  });

  it('should render bottom', () => {
    const tree = mount(<HomeTopics hasMore={false} {...homeTopicsProps} />);
    expect(toJson(tree, { noKey: true, mode: 'deep' })).toMatchSnapshot();
  });
});

describe('<HomeTopicTitle />', () => {
  const homeTopicTitleProps = {
    tab: 'all',
    topic: {
      author: {
        avatar_url: '//',
        loginname: 'admin',
      },
      id: '007',
      title: 'title',
      tab: 'ask',
      top: false,
      good: true,
    },
  };

  it('should render Tag good', () => {
    const tree = mount(
      <MemoryRouter>
        <HomeTopicTitle {...homeTopicTitleProps} />
      </MemoryRouter>,
    );
    expect(toJson(tree, { noKey: true, mode: 'deep' })).toMatchSnapshot();
  });

  it('should render its own tab ask', () => {
    homeTopicTitleProps.topic.good = false;
    const tree = mount(
      <MemoryRouter>
        <HomeTopicTitle {...homeTopicTitleProps} />
      </MemoryRouter>,
    );
    expect(toJson(tree, { noKey: true, mode: 'deep' })).toMatchSnapshot();
  });

  it('should not render tab', () => {
    homeTopicTitleProps.tab = 'dev';
    const tree = mount(
      <MemoryRouter>
        <HomeTopicTitle {...homeTopicTitleProps} />
      </MemoryRouter>,
    );
    expect(toJson(tree, { noKey: true, mode: 'deep' })).toMatchSnapshot();
  });
});

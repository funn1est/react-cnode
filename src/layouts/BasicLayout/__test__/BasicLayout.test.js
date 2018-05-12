import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Map } from 'immutable';
import thunk from 'redux-thunk';
import toJson from 'enzyme-to-json';
import * as enquire from 'enquire-js';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import BasicLayout, { BasicLayoutComponent } from '../BasicLayout';
import FloatingMenu from '../components/FloatingMenu';

describe('<BasicLayout />', () => {
  let mockEnquire;
  const mockUnEnquire = sinon.stub(enquire, 'unenquireScreen');

  const routeProps = {
    route: {
      routes: [],
    },
    location: {
      pathname: '/',
    },
  };

  beforeEach(() => {
    mockEnquire = sinon.stub(enquire, 'enquireScreen');
  });

  afterEach(() => {
    mockEnquire.restore();
  });

  it('should render desktop view correctly', () => {
    mockEnquire.callsFake(fn => fn(true));

    const basicInitialState = Map({
      login: Map({ userData: { id: '007' } }),
      basic: Map({ tab: 'all' }),
    });

    const middleware = [thunk];
    const store = configureStore(middleware)(basicInitialState);
    const tree = mount(
      <MemoryRouter initialEntries={['/topic/123']}>
        <BasicLayout store={store} {...routeProps} />
      </MemoryRouter>,
    );
    expect(toJson(tree, { noKey: true, mode: 'deep' })).toMatchSnapshot();
  });

  it('should render mobile view correctly', () => {
    mockEnquire.callsFake(fn => fn(false));

    const basicInitialState = Map({
      login: Map({ userData: { id: '007' } }),
      basic: Map({ tab: 'all' }),
    });

    const middleware = [thunk];
    const store = configureStore(middleware)(basicInitialState);
    const tree = mount(
      <MemoryRouter initialEntries={['/topic/123']}>
        <BasicLayout store={store} {...routeProps} />
      </MemoryRouter>,
    );
    expect(toJson(tree, { noKey: true, mode: 'deep' })).toMatchSnapshot();
  });

  describe('<BasicLayoutComponent />', () => {
    const props = {
      user: { name: 'admin' },
      tab: 'dev',
      changeTab: jest.fn(),
      getCurrentUser: jest.fn(),
      logout: jest.fn(),
      history: {
        push: jest.fn(),
      },
    };
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<BasicLayoutComponent {...props} {...routeProps} />);
    });

    it('should unmount enquire handler on componentWillUnmount()', () => {
      wrapper.unmount();
      expect(mockUnEnquire.calledOnce).toBeTruthy();
    });

    it('onClickMenu()', () => {
      const navigateSpy = jest.spyOn(wrapper.instance(), 'navigate');
      const renderLogoutModalSpy = jest.spyOn(
        wrapper.instance(),
        'renderLogoutModal',
      );
      wrapper.instance().forceUpdate();

      // login
      wrapper.instance().onClickMenu({ key: 'login' });
      expect(navigateSpy).toHaveBeenCalledTimes(1);
      expect(navigateSpy).toHaveBeenLastCalledWith('/login');

      // logout
      wrapper.instance().onClickMenu({ key: 'logout' });
      expect(renderLogoutModalSpy).toHaveBeenCalledTimes(1);

      // user
      wrapper.instance().onClickMenu({ key: 'user' });
      expect(navigateSpy).toHaveBeenCalledTimes(2);
      expect(navigateSpy).toHaveBeenLastCalledWith('/user/admin');

      // job - different from tab: 'dev'
      wrapper.instance().onClickMenu({ key: 'job' });
      expect(props.changeTab).toHaveBeenCalledTimes(1);
      expect(props.changeTab).toHaveBeenLastCalledWith('job');

      // navigate to dev and current path is '/topic/123'
      wrapper.setProps({
        location: {
          pathname: '/topic/123',
        },
      });
      wrapper.instance().onClickMenu({ key: 'dev' });
      expect(props.changeTab).toHaveBeenCalledTimes(1);
      expect(navigateSpy).toHaveBeenCalledTimes(3);
      expect(navigateSpy).toHaveBeenLastCalledWith('/');

      wrapper.instance().onClickMenu({ key: undefined });
      expect(navigateSpy).toHaveBeenCalledTimes(3);
      expect(renderLogoutModalSpy).toHaveBeenCalledTimes(1);
      expect(props.changeTab).toHaveBeenCalledTimes(1);
    });

    it('should navigate to User page or confirm logout when click onClickUser()', () => {
      const navigateSpy = jest.spyOn(wrapper.instance(), 'navigate');
      const renderLogoutModalSpy = jest.spyOn(
        wrapper.instance(),
        'renderLogoutModal',
      );
      wrapper.instance().forceUpdate();

      wrapper.instance().onClickUser({ key: 'user' });
      expect(navigateSpy).toHaveBeenCalledTimes(1);
      expect(navigateSpy).toHaveBeenLastCalledWith('/user/admin');

      wrapper.instance().onClickUser({ key: 'logout' });
      expect(renderLogoutModalSpy).toHaveBeenCalledTimes(1);

      wrapper.instance().onClickUser({ key: 'error' });
      expect(navigateSpy).toHaveBeenCalledTimes(1);
      expect(renderLogoutModalSpy).toHaveBeenCalledTimes(1);
    });

    it('should navigate to route when click navigate button', () => {
      const spy = jest.spyOn(wrapper.instance(), 'navigate');
      wrapper.instance().forceUpdate();
      wrapper.instance().onClickUserLogin();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenLastCalledWith('/login');

      wrapper.instance().onClickPost();
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenLastCalledWith('/topic/create');
    });

    it('should scroll to top when call onClickTop()', () => {
      global.document.body.scrollTop = 20;
      wrapper.instance().onClickTop();
      expect(global.document.body.scrollTop).toEqual(0);
    });

    it('renderLogoutModal()', () => {
      wrapper.instance().renderLogoutModal();
      document.body.querySelectorAll('.ant-btn-primary')[0].click();
      expect(props.logout).toHaveBeenCalledTimes(1);
    });
  });
});

describe('<FloatingMenu />', () => {
  const floatingMenuProps = {
    renderUser: true,
    onClickUser: jest.fn(),
    onClickUserLogin: jest.fn(),
    onClickPost: jest.fn(),
    onClickTop: jest.fn(),
  };

  it('should render LoginMenu', () => {
    const tree = mount(
      <FloatingMenu renderPost={false} user={{}} {...floatingMenuProps} />,
    );
    expect(toJson(tree, { noKey: true, mode: 'deep' })).toMatchSnapshot();
  });

  it('should render Post', () => {
    const tree = mount(
      <FloatingMenu renderPost user={{ id: '007' }} {...floatingMenuProps} />,
    );
    expect(toJson(tree, { noKey: true, mode: 'deep' })).toMatchSnapshot();
  });
});

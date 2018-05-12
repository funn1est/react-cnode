import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { scrollUtils } from 'utils';
import ScrollToTop, { ScrollToTopComponent } from '../ScrollToTop';

describe('<ScrollToTop />', () => {
  const props = { location: { pathname: '/' }, history: { action: 'PUSH' } };
  const ScrollWrapper = () => (
    <ScrollToTop {...props}>
      <div>Hi</div>
    </ScrollToTop>
  );

  it('should render children', () => {
    const tree = mount(
      <MemoryRouter>
        <ScrollWrapper />
      </MemoryRouter>,
    );
    expect(toJson(tree, { noKey: true, mode: 'deep' })).toMatchSnapshot();
  });

  it('should call scrollUtils scrollTo()', () => {
    const spy = sinon.spy(scrollUtils, 'scrollTo');
    const wrapper = shallow(
      <ScrollToTopComponent {...props}>
        <div>Hi</div>
      </ScrollToTopComponent>,
    );
    wrapper.setProps({ location: { pathname: '/user/admin' } });
    expect(spy.calledOnce).toBeTruthy();

    wrapper.setProps({ history: { action: 'PUSH' } });
    expect(spy.calledOnce).toBeTruthy();
  });
});

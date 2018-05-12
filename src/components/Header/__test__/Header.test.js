import React, { cloneElement } from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import Header from '../Header';

describe('<Header />', () => {
  const props = {
    isMobile: false,
    user: {},
    onClickMenu: jest.fn(),
  };
  const tree = mount(
    <MemoryRouter>
      <Header {...props} />
    </MemoryRouter>,
  );

  it('should render login', () => {
    expect(toJson(tree, { noKey: true, mode: 'deep' })).toMatchSnapshot();
  });

  it('should re-render when isMobile or user change', () => {
    tree.setProps({
      children: cloneElement(tree.props().children, {
        user: { id: '007', name: 'admin' },
      }),
    });
    expect(toJson(tree, { noKey: true, mode: 'deep' })).toMatchSnapshot();
  });
});

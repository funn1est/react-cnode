import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import Header from '../Header';

describe('<Header />', () => {
  it('should render login', () => {
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
    expect(toJson(tree, { noKey: true, mode: 'deep' })).toMatchSnapshot();
  });
});

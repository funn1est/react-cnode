import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Loading from '../Loading';

describe('<Loading />', () => {
  it('should render correctly', () => {
    const tree = mount(<Loading />);
    expect(toJson(tree, { noKey: true, mode: 'deep' })).toMatchSnapshot();
  });
});

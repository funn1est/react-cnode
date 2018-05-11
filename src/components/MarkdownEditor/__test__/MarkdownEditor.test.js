import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MarkdownEditor from '../MarkdownEditor';

describe('<MarkdownEditor />', () => {
  it('should render correctly', () => {
    const tree = shallow(
      <MarkdownEditor value="content" onEditorChange={jest.fn()} />,
    );
    expect(toJson(tree, { noKey: true })).toMatchSnapshot();
  });
});

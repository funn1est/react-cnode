import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { TopicEditor } from '../components';

describe('<TopicEditor />', () => {
  it('should render correctly', () => {
    const tree = shallow(
      <TopicEditor
        value="content"
        loading={false}
        onEditorChange={jest.fn()}
        onClickReply={jest.fn()}
      />,
    );
    expect(toJson(tree, { noKey: true })).toMatchSnapshot();
  });
});

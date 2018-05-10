import React from 'react';
import { shallow, mount } from 'enzyme';
import { fromJS } from 'immutable';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import TopicUp, { TopicUpComponent } from '../components/TopicUp';

describe('<TopicUp />', () => {
  const props = {
    replyId: '123',
    onClickUp: jest.fn(),
  };

  it('should render correctly', () => {
    const initialState = fromJS({
      topic: {
        repliesData: {
          entities: {
            '123': {
              ups: 2,
              is_uped: true,
            },
          },
        },
      },
    });

    const store = configureStore()(initialState);
    const tree = mount(<TopicUp store={store} {...props} />);
    expect(toJson(tree, { noKey: true, mode: 'deep' })).toMatchSnapshot();
  });

  it('should call onClickUp() when up button clicked', () => {
    const wrapper = shallow(<TopicUpComponent {...props} />);
    wrapper.instance().onUpChange();
    expect(props.onClickUp).toHaveBeenCalledTimes(1);
  });
});

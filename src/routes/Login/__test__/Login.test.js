import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Map } from 'immutable';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { Form } from 'antd';
import Login, { LoginComponent } from '../Login';

describe('<Login />', () => {
  const loginProps = {
    loading: false,
  };

  it('should render correctly', () => {
    const loginInitialState = Map({
      login: Map(loginProps),
    });
    const store = configureStore()(loginInitialState);

    const tree = mount(
      <MemoryRouter keyLength={0}>
        <Login store={store} />
      </MemoryRouter>,
    );
    expect(toJson(tree, { noKey: true, mode: 'deep' })).toMatchSnapshot();
  });

  it('should change state when call onRememberChange()', () => {
    const wrapper = shallow(<LoginComponent {...loginProps} />);
    wrapper.instance().onRememberChange({ target: { checked: true } });
    expect(wrapper.state().remember).toEqual(true);
  });

  it('should call error when input token incorrect', () => {
    const LoginForm = Form.create()(LoginComponent);
    let instance;
    const wrapper = mount(
      <LoginForm
        {...loginProps}
        wrappedComponentRef={node => {
          instance = node;
        }}
      />,
    );
    wrapper.find('form').simulate('submit');
    expect(instance.props.form.getFieldError('token')).toEqual([
      '请输入 Access Token',
    ]);

    wrapper.find('.ant-input').simulate('change', { target: { value: 'F' } });
    expect(instance.props.form.getFieldError('token')).toEqual([
      '请输入正确的 Access Token',
    ]);
  });

  it('should call onClickSubmit() when input correct', () => {
    const props = {
      ...loginProps,
      userLogin: jest.fn((a, b, fn) => fn()),
      history: {
        push: jest.fn(),
      },
    };

    const LoginForm = Form.create()(LoginComponent);
    const wrapper = mount(<LoginForm {...props} />);

    wrapper.find('.ant-input').simulate('change', {
      target: { value: '12345678-1234-1234-1234-123412341234' },
    });
    wrapper.find('form').simulate('submit');
    expect(props.userLogin).toHaveBeenCalled();
    expect(props.history.push).toHaveBeenCalled();
  });
});

import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { instance } from 'services/instance';
import { TopicsApi } from 'services/api';
import { PostComponent } from '../Post';
import { PostTab, PostTitle } from '../components';

describe('<Post />', () => {
  const postProps = {
    id: '007',
    tab: 'dev',
    title: 'title',
    content: 'content',
  };
  const routeProps = {
    location: {
      pathname: '/topic/123456789012345678901234',
    },
  };
  const routeEditProps = {
    location: {
      pathname: '/topic/123456789012345678901234/edit',
    },
  };

  it('should render correctly', () => {
    const tree = shallow(<PostComponent {...postProps} {...routeProps} />);
    expect(toJson(tree, { noKey: true })).toMatchSnapshot();
  });

  it('should use edit props', () => {
    const wrapper = shallow(
      <PostComponent {...postProps} {...routeEditProps} />,
    );
    expect(wrapper.state().isPost).toBeFalsy();
    expect(wrapper.state().contentValue).toEqual(postProps.content);
    expect(wrapper.state().tab).toEqual(postProps.tab);
    expect(wrapper.state().titleValue).toEqual(postProps.title);
  });

  describe('<PostComponent /> default state wrapper', () => {
    let wrapper;
    const iconPrefix = '.ant-notification-notice-icon';
    const navProps = {
      history: {
        push: jest.fn(),
      },
    };

    beforeEach(() => {
      wrapper = shallow(
        <PostComponent {...postProps} {...routeProps} {...navProps} />,
      );
    });

    it('should change state when call onTabChange()', () => {
      wrapper.instance().onTabChange({ target: { value: 'job' } });
      expect(wrapper.state().tab).toEqual('job');
    });

    it('should change state when call onTitleChange()', () => {
      wrapper.instance().onTitleChange({ target: { value: 'title1' } });
      expect(wrapper.state().titleValue).toEqual('title1');
    });

    it('should change state when call onEditorChange()', () => {
      wrapper.instance().onEditorChange('content1');
      expect(wrapper.state().contentValue).toEqual('content1');
    });

    it('should call error when title length is 0', async () => {
      wrapper.instance().onClickSubmit();
      await expect(
        document.querySelectorAll(`${iconPrefix}-error`).length,
      ).toBe(1);
    });

    it('should call error when content length is 0', async () => {
      wrapper.setState({ titleValue: 'title' });
      wrapper.instance().onClickSubmit();
      await expect(
        document.querySelectorAll(`${iconPrefix}-error`).length,
      ).toBe(2);
    });

    describe('onClickSubmit() services mock', () => {
      let mockAxios;
      localStorage.setItem('user', JSON.stringify({ token: '123456' }));

      beforeEach(() => {
        wrapper.setState({ titleValue: 'title', contentValue: 'content' });
        mockAxios = sinon.stub(instance, 'post');
      });

      afterEach(() => {
        mockAxios.restore();
      });

      it('post Topic success', async () => {
        mockAxios.withArgs(TopicsApi.topics).resolves({
          status: 200,
          data: { success: true, topic_id: '123' },
        });

        await wrapper
          .instance()
          .onClickSubmit()
          .then(() => {
            expect(document.querySelectorAll('.ant-message').length).toBe(1);
            expect(navProps.history.push).toHaveBeenCalled();
          });
      });

      it('edit Topic success', async () => {
        wrapper.setState({ isPost: false });
        mockAxios.withArgs(TopicsApi.topicsUpdate).resolves({
          status: 200,
          data: { success: true, topic_id: '321' },
        });

        await wrapper
          .instance()
          .onClickSubmit()
          .then(() => {
            expect(document.querySelectorAll('.ant-message').length).toBe(1);
            expect(navProps.history.push).toHaveBeenCalled();
          });
      });

      it('service return success: false', async () => {
        mockAxios.withArgs(TopicsApi.topics).resolves({
          status: 200,
          data: { success: false },
        });

        await wrapper
          .instance()
          .onClickSubmit()
          .then(() => {
            expect(
              document.querySelectorAll(`${iconPrefix}-warning`).length,
            ).toBe(1);
          });
      });

      it('service error reject', async () => {
        mockAxios.withArgs(TopicsApi.topics).rejects();

        await wrapper
          .instance()
          .onClickSubmit()
          .then(() => {
            expect(wrapper.state().loading).toBeFalsy();
          });
      });
    });
  });
});

describe('<PostTab />', () => {
  it('should render correctly', () => {
    const tree = mount(<PostTab onTabChange={jest.fn()} />);
    expect(toJson(tree, { noKey: true, mode: 'deep' })).toMatchSnapshot();
  });
});

describe('<PostTitle />', () => {
  it('should render correctly', () => {
    const tree = mount(<PostTitle value="title" onTitleChange={jest.fn()} />);
    expect(toJson(tree, { noKey: true, mode: 'deep' })).toMatchSnapshot();
  });
});

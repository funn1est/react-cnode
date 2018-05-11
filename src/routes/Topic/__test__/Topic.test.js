import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { instance } from 'services/instance';
import { ReplyApi } from 'services/api';
import toJson from 'enzyme-to-json';
import { TopicComponent } from '../Topic';

describe('<Topic />', () => {
  const routeProps = {
    match: {
      params: {
        id: '123456',
      },
    },
  };

  it('should render correctly', () => {
    const props = {
      currentUser: {
        id: '007',
      },
      error: false,
      getTopicData: jest.fn(),
    };
    const tree = shallow(<TopicComponent {...props} {...routeProps} />);
    expect(toJson(tree, { noKey: true })).toMatchSnapshot();
  });

  it('should render <Exception />', () => {
    const props = {
      currentUser: {
        id: '007',
      },
      error: true,
      getTopicData: jest.fn(),
    };
    const tree = shallow(<TopicComponent {...props} {...routeProps} />);
    expect(toJson(tree, { noKey: true })).toMatchSnapshot();
  });

  describe('<TopicComponent />', () => {
    const iconPrefix = '.ant-notification-notice-icon';
    const props = {
      error: true,
      currentUser: {
        token: '123',
      },
      getTopicData: jest.fn(),
      upReply: jest.fn(),
    };

    let wrapper;
    let mockAxios;

    beforeEach(() => {
      wrapper = shallow(<TopicComponent {...props} {...routeProps} />);
      wrapper.setState({ contentValue: 'content' });
      mockAxios = sinon.stub(instance, 'post');
    });

    afterEach(() => {
      mockAxios.restore();
    });

    it('should change state when call onReplyPageChange()', () => {
      wrapper.instance().onReplyPageChange(2);
      expect(wrapper.state().replyPage).toEqual(2);
    });

    it('should change state when call onReplySizeChange()', () => {
      wrapper.instance().onReplySizeChange(2, 20);
      expect(wrapper.state().replyPage).toEqual(2);
      expect(wrapper.state().replySize).toEqual(20);
    });

    it('should call upReply() when click up', () => {
      wrapper.instance().onClickUp(2);
      expect(props.upReply).toHaveBeenCalledTimes(1);
    });

    it('should not call upReply() when token is undefined', () => {
      const ownProps = {
        ...props,
        currentUser: {
          token: undefined,
        },
        upReply: jest.fn(),
      };
      const ownWrapper = shallow(
        <TopicComponent {...ownProps} {...routeProps} />,
      );
      ownWrapper.instance().onClickUp(2);
      expect(ownProps.upReply).toHaveBeenCalledTimes(0);
    });

    it('should change state when call onEditorChange()', () => {
      wrapper.instance().onEditorChange('content123');
      expect(wrapper.state().contentValue).toEqual('content123');
    });

    it('should show error when contentValue length is 0', async () => {
      wrapper.setState({ contentValue: '' });
      await wrapper
        .instance()
        .onClickAddReply()
        .then(() => {
          expect(document.querySelectorAll(`${iconPrefix}-error`).length).toBe(
            1,
          );
        });
    });

    it('addReply() success', async () => {
      mockAxios
        .withArgs(
          ReplyApi.reply.replace(/:topic_id/, routeProps.match.params.id),
        )
        .resolves({ status: 200, data: { success: true, reply_id: '321' } });

      await wrapper
        .instance()
        .onClickAddReply()
        .then(() => {
          expect(wrapper.state().contentValue).toEqual('');
          expect(wrapper.state().replyId).toEqual('321');
          expect(wrapper.state().replyLoading).toBeFalsy();
        });
    });

    it('addReply() service return success: false', async () => {
      mockAxios
        .withArgs(
          ReplyApi.reply.replace(/:topic_id/, routeProps.match.params.id),
        )
        .resolves({ status: 200, data: { success: false } });

      await wrapper
        .instance()
        .onClickAddReply()
        .then(() => {
          expect(
            document.querySelectorAll(`${iconPrefix}-warning`).length,
          ).toBe(1);
          expect(wrapper.state().replyLoading).toBeFalsy();
        });
    });

    it('addReply() service error reject', async () => {
      mockAxios
        .withArgs(
          ReplyApi.reply.replace(/:topic_id/, routeProps.match.params.id),
        )
        .rejects();

      await wrapper
        .instance()
        .onClickAddReply()
        .then(() => {
          expect(
            document.querySelectorAll(`${iconPrefix}-warning`).length,
          ).toBe(2);
          expect(wrapper.state().replyLoading).toBeFalsy();
        });
    });

    it('addReply() success and jump to reply anchor', () => {
      const ownProps = {
        ...props,
        getTopicData: jest.fn((a, b, fn) => fn(5)),
      };
      const ownWrapper = shallow(
        <TopicComponent {...ownProps} {...routeProps} />,
      );
      ownWrapper.setState({ replyId: '110' });
      ownWrapper.instance().getTopicData();
      expect(ownWrapper.state().replyPage).toEqual(1);
    });

    it('addReply() success and change replyPage and jump to reply anchor', () => {
      const ownProps = {
        ...props,
        getTopicData: jest.fn((a, b, fn) => fn(11)),
      };
      const ownWrapper = shallow(
        <TopicComponent {...ownProps} {...routeProps} />,
      );
      ownWrapper.setState({ replyId: '110' });
      ownWrapper.instance().getTopicData();
      expect(ownWrapper.state().replyPage).toEqual(2);
    });
  });
});

import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';

const tabs = [
  {
    key: 'share',
    name: '分享',
  },
  {
    key: 'ask',
    name: '问答',
  },
  {
    key: 'job',
    name: '招聘',
  },
  {
    key: 'dev',
    name: '测试',
  },
];

const PostTab = ({ onTabChange }) => (
  <Radio.Group onChange={onTabChange} defaultValue="dev">
    {tabs.map(item => (
      <Radio.Button key={item.key} value={item.key}>{item.name}</Radio.Button>
    ))}
  </Radio.Group>
);

PostTab.propTypes = {
  onTabChange: PropTypes.func.isRequired,
};

export default PostTab;

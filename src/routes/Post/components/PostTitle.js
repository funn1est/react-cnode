import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const PostTitle = ({ value, onTitleChange }) => {
  return (
    <Input.TextArea
      placeholder="请输入文章标题 - 最多 120 字"
      autosize
      maxLength="120"
      value={value}
      onChange={onTitleChange}
    />
  );
};

PostTitle.propTypes = {
  value: PropTypes.string.isRequired,
  onTitleChange: PropTypes.func.isRequired,
};

export default PostTitle;

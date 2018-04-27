import React from 'react';
import PropTypes from 'prop-types';
import Editor from 'react-simplemde-editor';
import 'styles/MarkdownEditor.scss';

const MarkdownEditor = ({ value, onEditorChange }) => (
  <Editor
    value={value}
    onChange={onEditorChange}
    options={{
      autoDownloadFontAwesome: false,
      spellChecker: false,
      placeholder: '支持 Markdown 语法',
    }}
  />
);

MarkdownEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onEditorChange: PropTypes.func.isRequired,
};

export default MarkdownEditor;

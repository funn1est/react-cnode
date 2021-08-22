import React from 'react';
import PropTypes from 'prop-types';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import marked from 'marked';

const Tiptap = ({ content, editable = false }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: marked(content || ''),
    editable,
  });

  return <EditorContent editor={editor} />;
};

Tiptap.propTypes = {
  content: PropTypes.string.isRequired,
  editable: PropTypes.bool,
};

export default Tiptap;

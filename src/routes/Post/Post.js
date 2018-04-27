import React from 'react';
import MarkdownEditor from 'components/MarkdownEditor';
import styles from './Post.scss';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textValue: '',
    };
    this.onEditorChange = this.onEditorChange.bind(this);
  }

  onEditorChange(value) {
    console.log(value);
    this.setState({
      textValue: value,
    });
  }

  render() {
    return (
      <div className={styles.container}>
        Post
        <MarkdownEditor
          value={this.state.textValue}
          onEditorChange={this.onEditorChange}
        />
      </div>
    );
  }
}

export default Post;

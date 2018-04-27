import React from 'react';
import { Button } from 'antd';
import MarkdownEditor from 'components/MarkdownEditor';
import styles from './Post.scss';
import { PostTab, PostTitle } from './components';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'dev',
      titleValue: '',
      contentValue: '',
    };
    this.onTabChange = this.onTabChange.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onEditorChange = this.onEditorChange.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
  }

  onTabChange({ target: { value } }) {
    this.setState({
      tab: value,
    });
  }

  onTitleChange({ target: { value } }) {
    this.setState({
      titleValue: value,
    });
  }

  onEditorChange(value) {
    this.setState({
      contentValue: value,
    });
  }

  onSubmitClick() {
    const { titleValue: title, tab, contentValue: content } = this.state;
    console.log(title);
    console.log(tab);
    console.log(content);
  }

  render() {
    const { titleValue, contentValue } = this.state;
    return (
      <div className={styles.container}>
        <PostTab onTabChange={this.onTabChange} />
        <PostTitle
          value={titleValue}
          onTitleChange={this.onTitleChange}
        />
        <MarkdownEditor
          value={contentValue}
          onEditorChange={this.onEditorChange}
        />
        <Button
          type="primary"
          icon="share-alt"
          onClick={this.onSubmitClick}
        >
          发布主题
        </Button>
      </div>
    );
  }
}

export default Post;

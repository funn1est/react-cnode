import React from 'react';
import { Rate, Icon } from 'antd';
import styles from './TopicUp.scss';

class TopicUp extends React.PureComponent {
  onUpChange = () => {
    const { id, itemKey } = this.props;
    this.props.onClickUp(id, itemKey);
  };

  render() {
    const { ups, isUp } = this.props;
    const value = isUp === true ? 1 : 0;
    return (
      <div className={styles.container}>
        {ups > 0 ? ups : null}
        <Rate
          className={styles.rate}
          count={1}
          value={value}
          character={<Icon type="like" />}
          onChange={this.onUpChange}
        />
      </div>
    );
  }
}

export default TopicUp;

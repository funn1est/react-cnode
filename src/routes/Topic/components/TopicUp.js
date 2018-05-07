import React from 'react';
import PropTypes from 'prop-types';
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
        <Rate
          count={1}
          value={value}
          character={<Icon type="like" />}
          onChange={this.onUpChange}
        />
        {ups > 0 ? ups : null}
      </div>
    );
  }
}

TopicUp.propTypes = {
  id: PropTypes.string.isRequired,
  itemKey: PropTypes.number.isRequired,
  ups: PropTypes.number.isRequired,
  isUp: PropTypes.bool.isRequired,
  onClickUp: PropTypes.func.isRequired,
};

export default TopicUp;

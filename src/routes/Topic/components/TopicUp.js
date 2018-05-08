import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Rate, Icon } from 'antd';
import styles from './TopicUp.scss';

@connect((state, { replyId }) => ({
  replyUps: state.getIn(['topic', 'repliesData', 'entities', replyId, 'ups']),
  replyIsUp: state.getIn([
    'topic',
    'repliesData',
    'entities',
    replyId,
    'is_uped',
  ]),
}))
class TopicUp extends React.Component {
  onUpChange = () => {
    const { replyId } = this.props;
    this.props.onClickUp(replyId);
  };

  render() {
    const { replyUps, replyIsUp } = this.props;
    const value = replyIsUp === true ? 1 : 0;
    return (
      <div className={styles.container}>
        <Rate
          count={1}
          value={value}
          character={<Icon type="like" />}
          onChange={this.onUpChange}
        />
        {replyUps > 0 ? replyUps : null}
      </div>
    );
  }
}

TopicUp.propTypes = {
  replyId: PropTypes.string.isRequired,
  replyUps: PropTypes.number,
  replyIsUp: PropTypes.bool,
  onClickUp: PropTypes.func.isRequired,
};

export default TopicUp;

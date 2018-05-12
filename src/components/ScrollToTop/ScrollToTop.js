import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { scrollUtils } from 'utils';

@withRouter
class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (
      this.props.location !== prevProps.location &&
      this.props.history.action === 'PUSH'
    ) {
      scrollUtils.scrollTo(0);
    }
  }

  render() {
    return this.props.children;
  }
}

ScrollToTop.propTypes = {
  location: PropTypes.string,
  history: PropTypes.shape({
    action: PropTypes.string,
  }),

  children: PropTypes.node.isRequired,
};

export default ScrollToTop;

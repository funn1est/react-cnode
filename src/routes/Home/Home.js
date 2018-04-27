import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { HomeContent } from './components';
import { getTopicsData } from './HomeRedux';

@connect(
  state => ({
    tab: state.basic.tab,
  }),
  dispatch => ({
    getTopicsData: bindActionCreators(getTopicsData, dispatch),
  }),
)
class Home extends React.PureComponent {
  static propTypes = {
    tab: PropTypes.string,
    getTopicsData: PropTypes.func,
  };

  componentDidMount() {
    const { tab } = this.props;
    this.props.getTopicsData(tab);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tab !== this.props.tab) {
      const { tab } = this.props;
      this.props.getTopicsData(tab);
    }
  }

  render() {
    return (
      <HomeContent />
    );
  }
}

export default Home;

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { HomeTopics } from './components';
import { getTopicsData } from './HomeRedux';

@connect(
  state => ({
    tab: state.basic.tab,
    loading: state.home.loading,
    topicsData: state.home.topicsData,
  }),
  dispatch => ({
    getTopicsData: bindActionCreators(getTopicsData, dispatch),
  }),
)
class Home extends React.PureComponent {
  static propTypes = {
    tab: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    topicsData: PropTypes.array.isRequired,
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
    const { tab, loading, topicsData } = this.props;
    return (
      <HomeTopics tab={tab} loading={loading} topicsData={topicsData} />
    );
  }
}

export default Home;

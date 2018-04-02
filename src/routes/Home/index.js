import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { HomeComponent } from 'components';
import { getTopicsData } from './HomeRedux';

const { HomeContent } = HomeComponent;

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
    getTopicsData: PropTypes.func,
    topicsData: PropTypes.array,
    loading: PropTypes.bool,
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
    const { topicsData, loading } = this.props;
    return (
      <HomeContent topicsData={topicsData} loading={loading} />
    );
  }
}

export default Home;

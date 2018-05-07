import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Exception from 'components/Exception';
import { HomeTopics } from './components';
import { getTopicsData, getMoreTopicsData } from './HomeRedux';

@connect(
  state => ({
    tab: state.getIn(['basic', 'tab']),
    loading: state.getIn(['home', 'loading']),
    loadingMore: state.getIn(['home', 'loadingMore']),
    hasMore: state.getIn(['home', 'hasMore']),
    topicsData: state.getIn(['home', 'topicsData']),
    error: state.getIn(['home', 'error']),
  }),
  {
    getTopicsData,
    getMoreTopicsData,
  },
)
class Home extends React.PureComponent {
  static propTypes = {
    tab: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    loadingMore: PropTypes.bool.isRequired,
    hasMore: PropTypes.bool.isRequired,
    topicsData: PropTypes.array.isRequired,
    getTopicsData: PropTypes.func,
    getMoreTopicsData: PropTypes.func,
    error: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      topicsPage: 1,
    };
  }

  componentDidMount() {
    const { tab } = this.props;
    this.props.getTopicsData(tab, 1, () => {});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tab !== this.props.tab) {
      const { tab } = this.props;
      this.props.getTopicsData(tab, 1, () => {
        this.setState({
          topicsPage: 1,
        });
      });
    }
  }

  handleInfiniteOnLoad = async () => {
    const { tab, hasMore } = this.props;
    if (hasMore) {
      const { topicsPage } = this.state;
      this.props.getMoreTopicsData(tab, topicsPage + 1, () => {
        this.setState({
          topicsPage: topicsPage + 1,
        });
      });
    }
  };

  render() {
    const {
      tab,
      loading,
      loadingMore,
      hasMore,
      topicsData,
      error,
    } = this.props;
    return (
      <React.Fragment>
        {!error ? (
          <HomeTopics
            tab={tab}
            loading={loading}
            loadingMore={loadingMore}
            topicsData={topicsData}
            hasMore={hasMore}
            handleInfiniteOnLoad={this.handleInfiniteOnLoad}
          />
        ) : (
          <Exception />
        )}
      </React.Fragment>
    );
  }
}

export default Home;

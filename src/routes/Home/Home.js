import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Title from 'components/Title';
import Exception from 'components/Exception';
import { scrollUtils } from 'utils';
import { HomeTopics } from './components';
import {
  getTopicsData,
  getMoreTopicsData,
  saveScrollHeight,
} from './HomeRedux';

export class HomeComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      topicsPage: 1,
    };
  }

  componentDidMount() {
    const {
      tab,
      topicsData,
      history: { action },
    } = this.props;
    if (topicsData.length === 0 || Object.is(action, 'PUSH')) {
      this.props.getTopicsData(tab, 1, () => {});
    } else {
      const { scrollHeight } = this.props;
      scrollUtils.scrollTo(scrollHeight);
    }
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

  componentWillUnmount() {
    this.props.saveScrollHeight(scrollUtils.getScrollHeight());
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
    if (error) {
      return <Exception />;
    }
    return (
      <Fragment>
        <Title title="React-CNode" />
        <HomeTopics
          tab={tab}
          loading={loading}
          loadingMore={loadingMore}
          topicsData={topicsData}
          hasMore={hasMore}
          handleInfiniteOnLoad={this.handleInfiniteOnLoad}
        />
      </Fragment>
    );
  }
}

HomeComponent.propTypes = {
  history: PropTypes.shape({
    action: PropTypes.string,
  }),

  tab: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  loadingMore: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool.isRequired,
  topicsData: PropTypes.array.isRequired,
  scrollHeight: PropTypes.number.isRequired,
  getTopicsData: PropTypes.func,
  getMoreTopicsData: PropTypes.func,
  saveScrollHeight: PropTypes.func,
  error: PropTypes.bool.isRequired,
};

export default connect(
  state => ({
    tab: state.getIn(['basic', 'tab']),
    loading: state.getIn(['home', 'loading']),
    loadingMore: state.getIn(['home', 'loadingMore']),
    hasMore: state.getIn(['home', 'hasMore']),
    topicsData: state.getIn(['home', 'topicsData']),
    error: state.getIn(['home', 'error']),
    scrollHeight: state.getIn(['home', 'scrollHeight']),
  }),
  {
    getTopicsData,
    getMoreTopicsData,
    saveScrollHeight,
  },
)(HomeComponent);

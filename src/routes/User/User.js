import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserData } from './UserRedux';

@connect(
  state => ({
    loading: state.user.loading,
    userData: state.user.userData,
  }),
  dispatch => ({
    getUserData: bindActionCreators(getUserData, dispatch),
  }),
)
class User extends React.Component {
  componentDidMount() {
    const { match: { params: { name } } } = this.props;
    console.log(name);
    this.props.getUserData(name);
  }

  render() {
    return (
      <div>I am User</div>
    );
  }
}

export default User;

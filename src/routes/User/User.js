import React from 'react';

class User extends React.Component {
  componentDidMount() {
    const { match: { params: { name } } } = this.props;
    console.log(name);
  }

  render() {
    return (
      <div>I am User</div>
    );
  }
}

export default User;

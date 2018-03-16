import React from 'react';

class Topic extends React.PureComponent {
  render() {
    const { match: { params: { id } } } = this.props;
    return (
      <div>Topic: {id}</div>
    );
  }
}

export default Topic;

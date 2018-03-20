import React from 'react';
import { Spin } from 'antd';

const asyncRender = getComponent => (
  class AsyncComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        Component: null,
      };
    }

    async componentDidMount() {
      try {
        const { default: Component } = await getComponent();
        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState({
          Component,
        });
      } catch (error) {
        return new Error(error);
      }
    }

    render() {
      const { Component: C } = this.state;
      return C ?
        <C {...this.props} /> :
        (
          <div
            style={{
              width: '100%',
              height: '100%',
              margin: 'auto',
              paddingTop: 50,
              textAlign: 'center',
            }}
          >
            <Spin size="large" />
          </div>
        );
    }
  }
);

export default asyncRender;

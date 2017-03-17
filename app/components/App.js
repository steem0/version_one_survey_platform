import React from 'react';
import Header from './Header';
import Welcome from './Welcome';
import Survey from './Survey';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

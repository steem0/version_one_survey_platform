import React from 'react';
import Header from './Header';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      authenticated: false
    };

    this.login = this.login.bind( this );
    this.logout = this.logout.bind( this );
  }

  logout() {}
  login() {}

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

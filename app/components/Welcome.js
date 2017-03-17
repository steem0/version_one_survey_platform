import React from 'react';
import { postJSON } from './fetchHelper';
import { Router, Route, Link } from 'react-router';

export default class Welcome extends React.Component {

  getKey() {
    // Build our callback function
    var callback = function( json ) {
      console.log( json );
    }

    // Fire our request
    postJSON( './key', { email: 'steve@email.com' }, callback.bind( this ) );
  }

  render() {
    var style = {
      marginBottom: '20px'
    };

    return (
      <div className="row">
        <section id="content" className="col-8 push-2">
          <div className="main-head col-6">
            <h1 className="front-page-heading">Data powers the insights we generate</h1>
          </div>
          <div className="home-intro col-6 last" style={style}>
            <p>We're seeking your data. All of it. Here, if you have a milkshake, and I have a milkshake, and I have a straw.</p>
            <p>There it is, that's a straw, you see? Watch it. Now, my straw reaches acroooooooss the room and starts to drink your milkshake.</p>
            <p>I... drink... your... milkshake! I drink it up!</p>
          </div>
          <div className="col-8 push-2 agreement">
            <p className="align-center">
              <Link to="/survey" className="button">I understand</Link>
              <a onClick={this.getKey}>How is my data kept private?</a>
            </p>
          </div>
        </section>
      </div>
    );
  }
}

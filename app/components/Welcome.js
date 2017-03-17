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
    var titleStyle = {
      fontSize: '4rem',
      margin: '20px 0 10px'
    };

    var codeStyle = {
      width: '50%'
    };

    return (
      <div className="row">
        <section id="content" className="col-8 push-2">
          <article className="hentry">
            <h1 style={titleStyle}>Welcome.</h1>
            <p>Thank you for expressing interest in this project. We believe that democratizing data about how startups operate is just the first step towards lorem ipsum.</p>
            <p>If this is your first time visiting the survey project, you should have been given an code to enter below. If you haven't receive a code, please contact <a href="mailto:someone@versionone.vc">someone</a>.</p>
            <p>If you're returning to the project, please enter your email or the survey key you were provided.</p>
            <p><input style={codeStyle} name="accessCode" placeholder="Access code, survey key, or email address." /><Link to="/survey" className="button">Let's Go!</Link></p>
          </article>
          <div className="col-8 push-2 agreement">
            <p className="align-center"><a onClick={this.getKey}>I don't want to share any identifying information!</a></p>
          </div>
        </section>
      </div>
    );
  }
}

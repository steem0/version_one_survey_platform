import React from 'react';
import { Link } from 'react-router';

export default class NotFound extends React.Component {

  render() {
    var style = {
      fontSize: '4rem',
      margin: '20px 0 10px'
    };

    return (
      <div className="row">
        <section id="content" className="col-8 push-2">
          <article className="hentry">
            <h1 style={style}>Page not found.</h1>
            <p>We've recently made changes to our website and the page you are looking for might have been deleted or moved.</p>
            <p>Please feel free to <a href="http://versionone.vc">visit our home page instead</a> or <Link to="/">log into our startup survey application.</Link></p>
            <p>We are sorry for the inconvenience.</p>
          </article>
        </section>
      </div>
    );
  }
}

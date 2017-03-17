import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Survey from './components/Survey';
import Welcome from './components/Welcome';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

// Simple class to handle 404 errors TODO: update this
const NotFound = () => ( <h1>404... This is not the page you're looking for.</h1> );

// Define our routing for the app
const routes = {
  path: '/',
  component: App,
  indexRoute: {
    component: Welcome,
    onLeave: function( prevState ) {
      return confirm( "Are you sure you wanna do this survey?" );
      console.log( 'leaving welcome page' );
    }
  },
  childRoutes: [
    {
      path: 'survey',
      component: Survey
    }
  ]
};

ReactDOM.render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById( 'root' )
);

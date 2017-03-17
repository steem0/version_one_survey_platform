import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Survey from './components/Survey';
import Welcome from './components/Welcome';
import NotFound from './components/NotFound';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Welcome}/>
      <Route path="/survey/:key" component={Survey}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>,
  document.getElementById( 'root' )
);

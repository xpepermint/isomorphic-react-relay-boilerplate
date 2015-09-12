import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import About from './components/About';
import Contact from './components/Contact';

export default (
  <Route path="/" component={App}>
    <Route path="/about" component={About}/>
    <Route path="/contact" component={Contact}/>
  </Route>
);

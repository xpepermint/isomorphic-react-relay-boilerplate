import React from 'react';
import {Link} from 'react-router';
import Helmet from "react-helmet";

let App = React.createClass({
  render() {
    return (
      <div>
        <Helmet title="Welcome"/>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
});

export default App;

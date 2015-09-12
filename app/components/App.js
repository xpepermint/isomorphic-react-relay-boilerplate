import React from 'react';
import {Link} from 'react-router';

let App = React.createClass({
  render() {
    return (
      <div>
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

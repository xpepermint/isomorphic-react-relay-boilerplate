# React Router Setup

The [react-router](https://github.com/rackt/react-router) is usually one of the main building blocks of every React application. The Router has a powerful features and keeps your UI in sync with the URL. Let's start by install the dependencies.

```
npm install --save react-router@1.0.0-rc1 history
```

This example we enable switching between `/about` and `/contact` paths. Let's first create components for that.

```js
// app/components/About
import React from 'react';

let About = () => (
  <div>Rendering About component</div>
);

export default About;
```

```js
// app/components/Contact
import React from 'react';

let Contact = () => (
  <div>Rendering Contact component</div>
);

export default Contact;

```

The App component will become the main component and will render child components. Let's modify the existing code into this:

```js
// app/components/App
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
```

We need to specify the structure of application routes. Create a new file `app/routes.js` and paste the code below.

```js
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
```

We have to change the rendering logic so we'll be rendering the `Router` component instead of the `App` component. Let's start with the `app/client.js` entry file.

```js
...
import Router from 'react-router';
import createHistory from 'history/lib/createBrowserHistory'
import routes from './routes';

let history = createHistory();

React.render(<Router history={history}>{routes}</Router>, document.getElementById('app'))
```

Modify also the `app/server.js` entry file.

```js
...
import createLocation from 'history/lib/createLocation';
import {RoutingContext, match} from 'react-router';
import routes from './routes';
...

app.use((req, res, next) => {
  let location = createLocation(req.url);

  match({routes, location}, (error, redirectLocation, renderProps) => {
    if (redirectLocation) return res.redirect(redirectLocation.pathname);
    if (error) return next(error.message);
    if (renderProps == null) return next(error);

    let markup = renderToString(<RoutingContext {...renderProps}/>);
    ...
  });
});

...
```

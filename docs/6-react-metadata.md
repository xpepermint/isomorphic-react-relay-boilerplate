# React Metadata

React does not handle the page title and meta tags. We will use the power of the [react-helmet](https://github.com/nfl/react-helmet) package.

Start by installing the dependencies.

```
npm install --save react-helmet
```

Put the `<Helmet/>` tag inside components.

```js
// app/components/App
...
import Helmet from "react-helmet";

let App = React.createClass({
  render() {
    return (
      <div>
        <Helmet title="App" />
        ...
      </div>
    )
  }
});
...
```

Open `app/server.js` and upgrade the server-side logic.

```js
import Helmet from 'react-helmet';
...
let markup = renderToString(...);
let helmet = Helmet.rewind();
let html = [
  ...
  `<head>`,
    `<title>${helmet.title}</title>`,
    helmet.meta,
    helmet.link,
    ...
  `</head>`,
  ...
].join('');
```

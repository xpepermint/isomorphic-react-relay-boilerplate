import './styles/index.styl';

import React from 'react';
import ReactDom from 'react-dom';
import Router from 'react-router';
import createHistory from 'history/lib/createHistory'
import routes from './routes';

let history = createHistory();

React.render(<Router history={history}>{routes}</Router>, document.getElementById('app'))

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';

import reducers from 'reducers';
import MovieAdmin from 'components/MovieAdmin';
import MovieList from 'components/MovieList';

const store = createStore(
  reducers,
  applyMiddleware(thunk),
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/admin" component={MovieAdmin} />
          <Route path="/" component={MovieList} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('#root'));

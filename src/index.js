import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import reducers from 'reducers';
import MovieAdd from 'components/MovieAdd';
import MovieList from 'components/MovieList';
import MovieDelete from 'components/MovieDelete';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/movies/add" component={MovieAdd} />
          <Route path="/movies/:id" component={MovieDelete} />
          <Route path="/" component={MovieList} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('#root'));

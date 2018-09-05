import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'actions';
import MovieAdd from 'components/MovieAdd';
import MovieList from 'components/MovieList';
import MovieDelete from 'components/MovieDelete';
import MovieSearch from 'components/MovieSearch';

class App extends Component {
  renderHeader() {
    return (
      <ul>
        <li>
          <Link to="/">Home Movie List</Link>
        </li>
        <li>
          <Link to="/add">Add a Movie</Link>
        </li>
        <li>
          <Link to="/delete">Delete a Movie</Link>
        </li>
        <li>
          <Link to="/search">Search a Movie</Link>
        </li>
      </ul>
    );


  }

  render() {
    return (
      <div>
        {this.renderHeader()}
        <Route path="/search" component={MovieSearch} />
        <Route path="/delete" component={MovieDelete} />
        <Route path="/add" component={MovieAdd} />
        <Route path="/" exact component={MovieList} />
     </div>
    );
  }
}

export default App;

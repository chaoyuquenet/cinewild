import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from 'actions';

import { fetchMovies } from 'actions/index';

class MovieList extends Component {
  componentDidMount() {
   this.props.fetchMovies();
  }

  renderMovies() {
    return _.map(this.props.movies, movie => {
      return (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`}>
            {movie.title}
          </Link>
        </li>
      );
    });
  }

  render(){
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/movies/add">
            Add a Movie
          </Link>
        </div>
        <h3>Movies</h3>
        <ul className="list-group">
          {this.renderMovies()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {movies:state.movies};
}

export default connect(mapStateToProps, {fetchMovies})(MovieList);

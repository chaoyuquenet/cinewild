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

  renderFooter() {
    return (
      <footer className="page-footer orange">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">Cinewild</h5>
              <p className="grey-text text-lighten-4">This is a small movie project by <a className="white-text" href="https://github.com/ChaoQuenet">Chao Quenet</a> for <a className="white-text" href='https://wildcodeschool.fr/'>Wild Code School</a></p>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            Made by <a className="orange-text text-lighten-3" href="http://materializecss.com">Materialize</a>
          </div>
        </div>
      </footer>
    );
  }

  render(){
    return (
      <div>
        <nav className="light-blue lighten-1" role="navigation">
          <div className="nav-wrapper container"><a id="logo-container" href="#" className="brand-logo">Cinewild</a>
          <ul className="right hide-on-med-and-down">
              <li>
                <Link to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/movies/add">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container">
          <br />
          <br />
          <form className="col s12">
            <div className="row center">
              <div className="input-field col s12 center">
                <input placeholder="Kung-fu Panda" id="search-movie" type="text" className="validate" />
                  <label htmlFor="search-movie">Movie Name</label>
                  <br />
                  <br />
                  <a className="waves-effect waves-light btn">Search with Cinewild</a>
              </div>
            </div>
          </form>
        </div>
        <ul className="list-group">
          {this.renderMovies()}
        </ul>
        {this.renderFooter()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {movies:state.movies};
}

export default connect(mapStateToProps, {fetchMovies})(MovieList);

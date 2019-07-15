import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

import {
  fetchMovies,
  searchMovieByProperty,
  getShuffleMovies,
  initProperties
} from 'actions/index';

const cardTitleClass = {
  'text-overflow': 'ellipsis',
  overflow: 'hidden',
  'max-width': '80%',
  'white-space': 'nowrap'
};

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBarInput: '',
      selectedProperty: 'languages',
      propertyValues: []
    };
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.handleSelectProperty = this.handleSelectProperty.bind(this);
    this.handleSelectPropertyValue = this.handleSelectPropertyValue.bind(this);
  }

  componentDidMount() {
    this.props.getShuffleMovies(true);
    this.props.initProperties();
  }

  renderMovies() {
    return _.map(this.props.movies, movie => {
      return (
        <li key={movie._id}>
          <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        </li>
      );
    });
  }

  handleSearchSubmit(e) {
    this.props.searchMovieByProperty(
      'title',
      this.state.searchBarInput,
      'searchResult'
    );
    e.preventDefault();
  }

  handleSearchInputChange(e) {
    this.setState({ searchBarInput: e.target.value });
  }

  renderSearchForm() {
    return (
      <form className="col s12" onSubmit={this.handleSearchSubmit}>
        <div className="row center">
          <div className="input-field col s12 center">
            <input
              placeholder="Kung-fu Panda"
              id="search-movie"
              type="text"
              className="validate"
              value={this.state.searchBarInput}
              onChange={this.handleSearchInputChange}
            />
            <label htmlFor="search-movie">Search criteria</label>
            <br />
            <br />
            <button
              className="waves-effect waves-light btn light-blue"
              type="submit"
            >
              Search with Cinewild
            </button>
          </div>
        </div>
      </form>
    );
  }

  renderMovieThumbnail(movie) {
    console.log(movie);

    return (
      <div className="card">
        <div className="card-image">
          <img
            src={
              movie.image
                ? `${movie.image}`
                : 'http://lexingtonvenue.com/media/poster-placeholder.jpg'
            }
          />
          {/* <span className="card-title light-blue" style={cardTitleClass}>
            {movie.movie_name}
          </span> */}
        </div>
        <div className="card-action">
          {movie.language} {movie.type}
        </div>
      </div>
    );
  }
  renderSearchResults() {
    const { searchResult } = this.props.movies;
    return searchResult === undefined ? (
      <ul />
    ) : (
      <ul className="row">
        {searchResult.map(movie => (
          <li className="col s12 m3" key={movie._id}>
            {this.renderMovieThumbnail(movie)}
          </li>
        ))}
      </ul>
    );
  }

  renderMoviesRow(moviesType) {
    return moviesType && moviesType.length ? (
      <ul className="row">
        {moviesType.map(movie => (
          <li className="col s12 m3" key={movie._id}>
            {this.renderMovieThumbnail(movie)}
          </li>
        ))}
      </ul>
    ) : (
      <ul className="row" />
    );
  }

  handleSelectProperty(e) {
    this.setState({ selectedProperty: e.target.value }, () => {
      const newValue = this.props.movies.properties[
        this.state.selectedProperty
      ];
      this.setState(
        {
          propertyValues: newValue,
          selectedPropertyValue: newValue[0]
        },
        () => {
          this.props.searchMovieByProperty(
            this.state.selectedProperty,
            newValue[0],
            'resultsByProperty'
          );
        }
      );
    });
  }

  handleSelectPropertyValue(e) {
    const newValue = e.target.value;
    this.setState({ selectedPropertyValue: newValue });
    this.props.searchMovieByProperty(
      this.state.selectedProperty,
      newValue,
      'resultsByProperty'
    );
  }

  renderByProperty() {
    const movieProperties = this.props.movies.properties;
    if (!movieProperties) {
      return;
    }
    debugger;
    const propertyValues = movieProperties[this.state.selectedProperty];
    return (
      <div className="input-field row s12">
        <select
          style={{ width: '10em', display: 'inline-block' }}
          className="browser-default"
          onChange={this.handleSelectProperty}
          value={this.state.selectedProperty}
        >
          {movieProperties
            ? Object.keys(movieProperties).map(property => (
                <option key={property}>{property}</option>
              ))
            : ''}
        </select>
        <select
          className="browser-default"
          onChange={this.handleSelectPropertyValue}
          style={{ width: '25em', display: 'inline-block' }}
          value={this.state.selectedPropertyValue}
        >
          {propertyValues &&
            propertyValues.map(propValue => (
              <option key={propValue}>{propValue}</option>
            ))}
        </select>
        <input type="text" />
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <br />
          <br />
          {this.renderSearchForm()}
          {this.renderSearchResults()}
        </div>
        <div className="container">
          <h4>Filter by property</h4>
          {this.renderByProperty()}
          {this.renderMoviesRow(this.props.movies.resultsByProperty)}
        </div>
        <div className="container">
          <h4>4 random movies</h4>
          {this.renderMoviesRow(this.props.movies.allMovies)}
        </div>
        <ul className="list-group" />
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { movies: state.movies };
}

export default connect(
  mapStateToProps,
  {
    fetchMovies,
    searchMovieByProperty,
    getShuffleMovies,
    initProperties
  }
)(MovieList);

import React, { Component } from 'react';
import { connect } from 'react-redux';

class MovieList extends Component {
  renderMovies() {
    return this.props.movies.map(movie => {
      return <li key={movie}>{movie}</li>;
    });
  }

  render(){
    return (
      <div>
        <h4>Movie List</h4>
        <ul>
          {this.renderMovies()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {movies:state.movies};
}

export default connect(mapStateToProps)(MovieList);

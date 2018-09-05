import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

class MovieDelete extends Component {
  onDeleteClick() {
    this.props.deleteMovie(this.state.movie)
  };

  render() {
    return (
      <div>
        <Link to="/">Back To Home</Link>
        <button
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Movie
        </button>
    </div>
    );
  }
}

export default MovieDelete;

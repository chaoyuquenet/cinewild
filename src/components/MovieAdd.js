import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';

class MovieAdd extends Component {
  state = { movie: '' };

  handleChange = (event)=> {
    this.setState ({ movie: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.saveMovie(this.state.movie)

    this.setState({ movie: '' });
  };

  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h4>Add a Movie</h4>
          <textarea onChange={this.handleChange} value={this.state.movie}/>
          <div>
            <button>Add Movie</button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, actions)(MovieAdd);

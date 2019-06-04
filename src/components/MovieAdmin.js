import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

import { addMovie, getAllMovies, deleteMovie } from 'actions/index';

class MovieAdd extends Component {
  constructor(props) {
    super(props);
    this.state= {
      title: '',
      type: '',
      language: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleSubmit(event) {
    const {title, type, language } = this.state
    this.props.addMovie(title, type, language);
    this.setState({
      title: '',
      type: '',
      language: '',
    }, () => {
      this.props.getAllMovies();
    });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleDelete(e) {
    this.props.deleteMovie(e.target.value);
  }
  
  componentDidMount() {
    this.props.getAllMovies();
  }

  renderMovieList() {
    const moviesList = this.props.movies.allMovies;
    return (
      <table>
        <thead>
        <tr>
          <th>
            Title
          </th>
          <th>
            Type
          </th>
          <th>
            Language
          </th>
        </tr>
        </thead>
        <tbody>
        {
          moviesList ?
           moviesList.map(movie => (
             <tr key={movie._id}>
               <td>{movie.title}</td>
               <td>{movie.type}</td>
               <td>{movie.language}</td>
               <td><button className="btn btn-primary red" value={movie._id} onClick={this.handleDelete}>Delete</button></td>
            </tr>
           )) :
           <tr></tr>
        }
        </tbody>
      </table>

    );
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <h4>Add a movie</h4>
          <form onSubmit={this.handleSubmit}>
            Title :<br />
            <input type="text" name="title" value={this.state.title} onChange={this.handleChange} /><br />
            Type :<br />
            <input type="text" name="type"  value={this.state.type} onChange={this.handleChange} /><br />
            Language :<br />
            <input type="text" name="language" value={this.state.language} onChange={this.handleChange} /><br />

            <button type="submit" className="btn btn-primary light-blue">Add</button>
          </form>
        </div>
        <div className="container">
          <div className="row">
            <h4>Movies in database</h4>
            {this.renderMovieList()}
          </div>
        </div>
        <ul className="list-group">
        </ul>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {movies:state.movies};
}

export default (
  connect(mapStateToProps, { addMovie, getAllMovies, deleteMovie })(MovieAdd)
);

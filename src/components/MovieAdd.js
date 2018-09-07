import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from 'actions';

import { addMovie } from 'actions/index';

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
  }

  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  onSubmit(values) {
      this.props.addMovie(values, () => {
        this.props.history.push('/');
      });
    }

    render() {

      return (
        <div>
          <nav>
            <Link to="/" className="btn btn-danger">Delete Movie</Link>
          </nav>
          <form onSubmit={this.handleSubmit}>
            Title :<br />
            <input type="text" name="title" value={this.state.title} onChange={this.handleChange} /><br />
            Type :<br />
            <input type="text" name="type"  value={this.state.type} onChange={this.handleChange} /><br />
            Language :<br />
            <input type="text" name="language" value={this.state.language} onChange={this.handleChange} /><br />

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      );
    }
  }

  export default (
    connect(null,{ addMovie })(MovieAdd)
  );

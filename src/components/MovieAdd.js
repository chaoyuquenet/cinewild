import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import * as actions from 'actions';

import { addMovie } from 'actions/index';

class MovieAdd extends Component {
  renderField(field) {
    const { meta: {touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{this.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
         {touched ? error: ''}
        </div>
      </div>
    );
  }
  onSubmit(values) {
      this.props.addMovie(values, () => {
        this.props.history.push('/');
      });
    }

    render() {
      const{handleSubmit}=this.props;

      return (
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Title"
            name="title"
            component={this.renderField}
          />
          <Field
            label="Type"
            name="type"
            component={this.renderField}
          />
          <Field
            label="language"
            name="language"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/" className="btn btn-danger">Delete Movie</Link>
        </form>
      );
    }
  }

  function validate(values) {
    const errors = {}

    //validate the inputs from 'values'
    if(!values.title) {
      errors.title= "Enter Title!";
    }
    if(!values.type) {
      errors.type= "Enter Type!";
    }
    if(!values.language) {
      errors.language= "Enter language!";
    }

    return errors;
  }

  export default reduxForm({
    validate,
    form: 'AddMovieForm'
  }) (
    connect(null,{ addMovie })(MovieAdd)
  );

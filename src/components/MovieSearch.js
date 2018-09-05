
import React, { Component } from 'react';

class MovieSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {term: ''};
  }

  onInputChange(term) {
    this.setState({term});
    this.props.onSearchTermChange(term);
  };

  render(){
    return (
     <div>
       <input
       value={this.state.term}
       onChange = {event => this.onInputChange(event.target.value)} />
       <button>Search</button>
     </div>
   );
 }
}

export default MovieSearch;

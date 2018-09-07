import _ from 'lodash';
import { FETCH_MOVIES, DELETE_MOVIE, SEARCH_MOVIE, ADD_MOVIE, FETCH_PROPERTIES } from 'actions/types';

export default function(state={}, action) {
  switch (action.type) {
    case ADD_MOVIE:
      return {
        ...state, allMovies: [...state.allMovies, action.payload]
      }
    case DELETE_MOVIE:
      return {
        ...state, allMovies: state.allMovies.filter(movie => action.payload !== movie._id)
      }
    case FETCH_MOVIES:
      return { ...state, allMovies: action.payload.sort((a,b)=> a.title > b.title) };
    case SEARCH_MOVIE: {
      return {
        ...state,
        [action.target]: action.payload,
      };
    }
    case FETCH_PROPERTIES: {
      return {
        ...state,
        properties: action.payload,
      };
    }
    default:
      return state;
  }
}

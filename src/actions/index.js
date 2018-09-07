import axios from 'axios';
import { FETCH_MOVIES, ADD_MOVIE, DELETE_MOVIE, FETCH_MOVIE } from 'actions/types';


const ROOT_URL = 'http://localhost:5000/api';

export function fetchMovies() {
  const request = axios.get( `${ROOT_URL}/movies` );

  return {
    type: FETCH_MOVIES,
    payload: request
  };
}

export function addMovie(values, callback) {
  const request = axios.post( `${ROOT_URL}/movies`, values )
   .then(() => callback());

  return {
    type: ADD_MOVIE,
    payload: request
  };
}

export function fetchMovie(id) {
  const request = axios.get( `${ROOT_URL}/movies/${id}`);

  return {
    type: FETCH_MOVIE,
    payload: request
  };
}

export function deleteMovie(id, callback) {
  const request = axios.delete( `${ROOT_URL}/movies/${id}`)
   .then(() => callback());

  return {
    type: DELETE_MOVIE,
    payload: id
  };
}

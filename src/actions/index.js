import { SAVE_MOVIE, DELETE_MOVIE } from 'actions/types';

export function saveMovie(movie) {
  return {
    type: SAVE_MOVIE,
    payload: movie
  };
}

export function deleteMovie(movie) {
  return {
    type: DELETE_MOVIE,
    payload: movie
  };
}

import axios from 'axios';
import { FETCH_MOVIES, ADD_MOVIE, DELETE_MOVIE, SEARCH_MOVIE, FETCH_PROPERTIES } from 'actions/types';


const ROOT_URL = 'http://localhost:5000';

export function fetchMovies() {
  const request = axios.get( `${ROOT_URL}/movies` );

  return {
    type: FETCH_MOVIES,
    payload: request
  };
}

export const addMovie = (title, type, language) => async (dispatch) => {
  const movieAddResult = await axios.post(`${ROOT_URL}/movies`, { title, type, language });

  dispatch(
    {
      type: ADD_MOVIE,
      payload: movieAddResult.data,
    });
}

export const deleteMovie = (id) => async (dispatch) => {
  const request = axios.delete( `${ROOT_URL}/movies/${id}`)

  dispatch({
    type: DELETE_MOVIE,
    payload: id
  });
}

const getPosters = async (localResults) => {
  const theMovieDbResults = await Promise.all(
      localResults.data.map(async movie =>
        await axios
          .get(`https://api.themoviedb.org/3/search/movie?api_key=0dc87e3b02d544111b18d319a319ef56&&query=` + encodeURIComponent(movie.title))
      )
    );
  return theMovieDbResults.map(dbMovieResult =>
    dbMovieResult.data.results.length > 0 ?
      dbMovieResult.data.results[0].poster_path :
      null
    );
}

const mergeDataWithPosters = (localData, posters) => {
    for (let i = 0; i < localData.data.length; i++) {
      localData.data[i].posterPath = posters[i];
    }
}

export const searchMovieByProperty = (property, value, target) => async (dispatch) => {
  const localApiResult = await axios.post(`${ROOT_URL}/movies/search`, { [property]: value});
  const posterPaths = await getPosters(localApiResult);

  mergeDataWithPosters(localApiResult, posterPaths);

  dispatch(
    {
      type: SEARCH_MOVIE,
      payload: localApiResult.data,
      target
    });
}

export const getAllMovies = (withPosters) => async (dispatch) => {
  const localApiResult = await axios.get(`${ROOT_URL}/movies`);
  if (withPosters) {
    const posterPaths = await getPosters(localApiResult);

    mergeDataWithPosters(localApiResult, posterPaths);
  }

  dispatch(
    {
      type: FETCH_MOVIES,
      payload: localApiResult.data,
    });
}

export const getShuffleMovies = (withPosters) => async (dispatch) => {
  const localApiResult = await axios.get(`${ROOT_URL}/movies/shuffle`);
  if (withPosters) {
    const posterPaths = await getPosters(localApiResult);

    mergeDataWithPosters(localApiResult, posterPaths);
  }

  dispatch(
    {
      type: FETCH_MOVIES,
      payload: localApiResult.data,
    });
}

export const initProperties = () => async (dispatch) => {
  let properties;
  try {
    properties = await axios.get(`${ROOT_URL}/movies/properties`);
  }
  catch(e) {
    console.error(e);
  }
  dispatch(
    {
      type: FETCH_PROPERTIES,
      payload: properties.data,
    });
}
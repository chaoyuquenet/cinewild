import { combineReducers } from 'redux';
import moviesReducer from 'reducers/movies';

const rootReducer = combineReducers({
  movies: moviesReducer,
});

export default rootReducer;

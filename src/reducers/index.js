import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import moviesReducer from 'reducers/movies';

const rootReducer = combineReducers({
  movies: moviesReducer,
  form: formReducer
});

export default rootReducer;

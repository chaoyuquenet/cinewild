import _ from 'lodash';
import { FETCH_MOVIES, DELETE_MOVIE, FETCH_MOVIE } from 'actions/types';

export default function(state={}, action) {
  switch (action.type) {
    case DELETE_MOVIE:
      return _.omit(state, action.payload);
    case FETCH_MOVIE:
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_MOVIES:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}

import _ from 'lodash';
import { SAVE_MOVIE, DELETE_MOVIE } from 'actions/types';

export default function(state=[], action) {
  switch (action.type) {
    case SAVE_MOVIE:
      return [...state, action.payload];
    case DELETE_MOVIE:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}

import {
  UPDATE_PROFILE,
  REQUEST_SINGLE_PROFILE,
  RECEIVE_SINGLE_PROFILE,
  RECEIVE_PROFILE_ERRORS,
  UPLOAD_IMAGE,
  RECEIVED_IMAGE } from '../actions/profile_actions';

import {
  RECEIVE_SESSION_ERRORS
} from '../actions/session_actions';

export default (state = false, action) => {
  switch(action.type){
    case RECEIVE_SINGLE_PROFILE:
    case RECEIVE_PROFILE_ERRORS:
    case RECEIVE_SESSION_ERRORS:
    case RECEIVED_IMAGE:
      return false;
    case UPDATE_PROFILE:
    case REQUEST_SINGLE_PROFILE:
    case UPLOAD_IMAGE:
      return true;
    default:
      return state;
  }
};

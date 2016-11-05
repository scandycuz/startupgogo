import { RECEIVE_SINGLE_PROFILE,
  RECEIVE_PROFILE_ERRORS } from '../actions/profile_actions';
import merge from 'lodash/merge';

const _nullProfile = Object.freeze({
  profile: {},
  errors: []
});

const ProfileReducer = (state = _nullProfile, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_SINGLE_PROFILE:
      const profile = action.profile;
      let newState = merge({}, state, { profile });
      return newState;
    case RECEIVE_PROFILE_ERRORS:
      const errors = action.errors;
      return merge({}, _nullProfile, {
        errors
      });
    default:
      return state;
  }
}

export default ProfileReducer;

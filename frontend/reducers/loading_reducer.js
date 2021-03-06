import {
  REQUEST_SINGLE_PROFILE,
  RECEIVE_SINGLE_PROFILE,
  RECEIVE_PROFILE_ERRORS,
  RECEIVE_IMAGE,
  UPLOAD_IMAGE,
  RECEIVE_USER_CAMPAIGNS } from '../actions/profile_actions';
import {
  REQUEST_SINGLE_CAMPAIGN,
  REQUEST_CAMPAIGNS,
  REQUEST_FEATURED_CAMPAIGNS,
  REQUEST_QUERIED_CAMPAIGNS,
  RECEIVE_QUERIED_CAMPAIGNS,
  RECEIVE_FEATURED_CAMPAIGNS,
  RECEIVE_SINGLE_CAMPAIGN,
  RECEIVE_CAMPAIGN_ERRORS,
  RECEIVE_CAMPAIGNS
} from '../actions/campaign_actions';

import {
  RECEIVE_CONTRIBUTIONS,
  RECEIVE_SINGLE_CONTRIBUTION
} from '../actions/contribution_actions';

import {
  RECEIVE_CURRENT_USER,
  RECEIVE_SESSION_ERRORS
} from '../actions/session_actions';

import {
  RECEIVE_SINGLE_REWARD,
  RECEIVE_REWARD_ERRORS,
  RECEIVE_REWARD_DELETE
} from '../actions/reward_actions';

import merge from 'lodash/merge';

const _nullstate = {
  campaign: false,
  profile: false,
  image: false,
  campaigns: false,
  featuredCampaigns: false,
  queriedCampaigns: false
}

export default (state = _nullstate, action) => {
  switch(action.type){
    case REQUEST_SINGLE_CAMPAIGN:
      return merge({}, state, {campaign: true});
    case REQUEST_CAMPAIGNS:
      return merge({}, state, {campaigns: true});
    case REQUEST_FEATURED_CAMPAIGNS:
      return merge({}, state, {featuredCampaigns: true});
    case REQUEST_SINGLE_PROFILE:
      return merge({}, state, {profile: true});
    case REQUEST_QUERIED_CAMPAIGNS:
      return merge({}, state, {queriedCampaigns: true});
    case UPLOAD_IMAGE:
      return merge({}, state, {image: true});
    case RECEIVE_SINGLE_PROFILE:
      return merge({}, state, {profile: false});
    // case RECEIVE_PROFILE_ERRORS:
    case RECEIVE_IMAGE:
      return merge({}, state, {image: false});
    // case RECEIVE_USER_CAMPAIGNS:
    case RECEIVE_SINGLE_CAMPAIGN:
      return merge({}, state, {campaign: false});
    // case RECEIVE_CAMPAIGN_ERRORS:
    case RECEIVE_CAMPAIGNS:
      return merge({}, state, {campaigns: false});
    case RECEIVE_FEATURED_CAMPAIGNS:
      return merge({}, state, {featuredCampaigns: false});
    case RECEIVE_QUERIED_CAMPAIGNS:
      return merge({}, state, {queriedCampaigns: false});
    // case RECEIVE_CONTRIBUTIONS:
    // case RECEIVE_SINGLE_CONTRIBUTION:
    // case RECEIVE_CURRENT_USER:
    // case RECEIVE_SESSION_ERRORS:
    // case RECEIVE_SINGLE_REWARD:
    // case RECEIVE_REWARD_ERRORS:
    // case RECEIVE_REWARD_DELETE:
      // return false;
    default:
      return state;
  }
};

import { RECEIVE_SINGLE_CAMPAIGN,
         RECEIVE_CAMPAIGNS,
         RECEIVE_CAMPAIGN_ERRORS } from '../actions/campaign_actions';
import { RECEIVE_REWARD_DELETE } from '../actions/reward_actions';
import { fetchSingleCampaign } from '../util/campaign_api_util';
import merge from 'lodash/merge';

const _nullCampaign= Object.freeze({
  campaign: {
    funds_received: 0,
    goal_amount: 0,
    card_image_url: "",
    pitch_image_url: "",
    pitch_video_url: "",
    campaign_overview: "",
    campaign_pitch: "",
    author: {},
    rewards: {},
    contributors: {}
  },
  campaigns: {},
  errors: []
});

const CampaignReducer = (state = _nullCampaign, action) => {
  Object.freeze(state);
  let newState;
  let clonedState;
  let campaign;

  switch(action.type) {
    case RECEIVE_SINGLE_CAMPAIGN:
      campaign = action.campaign;
      clonedState = merge({}, state);
      clonedState.campaign.rewards = {};
      clonedState.campaign.author = {};
      newState = merge({}, clonedState, { campaign });
      return newState;
    case RECEIVE_CAMPAIGNS:
      const campaigns = action.campaigns;
      newState = merge({}, state, { campaigns });
      return newState;
    case RECEIVE_CAMPAIGN_ERRORS:
      const errors = action.errors;
      return merge({}, _nullCampaign, {
        errors
      });
    case RECEIVE_REWARD_DELETE:
      campaign = action.campaign;
      clonedState = merge({}, state);
      clonedState.campaign.rewards = {};
      return merge({}, clonedState, {campaign});
    default:
      return state;
  }
}

export default CampaignReducer;

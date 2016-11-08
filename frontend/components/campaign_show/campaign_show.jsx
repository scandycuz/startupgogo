import React from 'react';
import { Router, Route, IndexRoute, hashHistory, withRouter } from 'react-router';

import GoalProgress from './goal_progress';

class CampaignShow extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.requestSingleCampaign(this.props.params.id)
  }

  // componentDidUpdate() {
  //   console.log(this.props.campaign);
  // }

  endDateToDuration(endDate) {
    if (endDate) {
      let endDateArray = endDate.split("-");
      let endDateFormatted = endDateArray[1]+","+endDateArray[2]+","+endDateArray[0];
      let timestamp = new Date(endDateFormatted).getTime();
      let durationLeft = timestamp - new Date();
      return Math.floor(durationLeft / (86400000));
    }
  }

  render() {
    const children = this.props.children;
    return(
      <div className="campaign-show">
        <div className="campaign-show-container container">
          <div className="grid-7 alpha">
            <img src={this.props.campaign.pitch_image_url}/>
          </div>
          <div className="grid-5 omega campaign-info">
            <h4>{this.props.campaign.title} by {this.props.author.first_name} {this.props.author.last_name}</h4>
            <p>{this.props.campaign.tagline}</p>
            <div className="campaign-author-container">
              <div className="author-image">
                <img src={this.props.author.small_photo_url} />
              </div>
              <div className="author-info">
                <p><strong>{this.props.author.first_name} {this.props.author.last_name}</strong></p>
                <p>{this.props.author.city}, {this.props.author.country}</p>
              </div>
            </div>

            <GoalProgress
              fundsReceived={this.props.campaign.funds_received}
              goalAmount={this.props.campaign.goal_amount}
              endDate={this.props.campaign.duration}
              daysLeft={this.endDateToDuration(this.props.campaign.duration)}/>
          </div>
        </div>
      </div>
    )
  }

}

export default withRouter(CampaignShow);

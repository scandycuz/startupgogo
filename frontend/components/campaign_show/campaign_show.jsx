import React from 'react';
import { Router, Route, IndexRoute, hashHistory, withRouter } from 'react-router';
import Modal from 'react-modal';
import merge from 'lodash/merge';

import GoalProgress from './goal_progress';
import Rewards from './rewards';

class CampaignShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: "story",
      contribution: {
        user_id: null,
        campaign_id: null,
        reward_id: null,
        amount: ""
      },
      reward: {
        title: "",
        amount: "",
        shippingRequired: false
      },
      buttonText: "Contribute",
      campaignPitchImageUrl: null,
      imageLoaded: false,
      modalIsOpen: false,
    }

    this.tabClass = this.tabClass.bind(this);
    this.linkToProfile = this.linkToProfile.bind(this);
    this.changeTab = this.changeTab.bind(this);
    this.handleImageLoaded = this.handleImageLoaded.bind(this);
    this.startCheckout = this.startCheckout.bind(this);
    this.confirmCheckout = this.confirmCheckout.bind(this);
    this.tabContent = this.tabContent.bind(this);
    this.backers = this.backers.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderModal = this.renderModal.bind(this);
  }

  componentDidMount() {
    this.setState({
      campaignPitchImageUrl: null,
      imageLoaded: false
    });

    window.scrollTo(0, 0);

    if (this.props.currentUser) {
      let contribution = Object.assign({},
                                       this.state.contribution,
                                       {user_id: this.props.currentUser.id},
                                       {campaign_id: parseInt(this.props.params.id)});
      let newState = Object.assign({}, this.state, {contribution});
      this.setState(newState);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.campaign.funds_received !== nextProps.campaign.funds_received) {
      this.props.requestSingleCampaign(this.props.params.id);
    }
    // if (nextProps.currentUser) {
    //   let contribution = merge({},
    //     this.state.contribution,
    //     {user_id: nextProps.currentUser.id},
    //     {campaign_id: parseInt(this.props.params.id)});
    //   let newState = merge({}, this.state, {buttonText: "Contribute"}, {contribution});
    //   this.setState(newState);
    // }
    if (this.state.campaignPitchImageUrl !== nextProps.campaign.pitch_image_url) {
      this.setState({campaignPitchImageUrl: nextProps.campaign.pitch_image_url});
    }

  }

  componentDidUpdate() {

  }

  handleImageLoaded() {
    this.setState({ imageLoaded: true });
  }

  endDateToDuration(endDate) {
    if (endDate) {
      let endDateArray = endDate.split("-");
      let endDateFormatted = endDateArray[1]+","+endDateArray[2]+","+endDateArray[0];
      let timestamp = new Date(endDateFormatted).getTime();
      let durationLeft = timestamp - new Date();
      return Math.floor(durationLeft / (86400000));
    }
  }

  tabClass(title) {
    if (title.toLowerCase() === this.state.selectedTab) {
      return "clickable selected";
    } else {
      return "clickable";
    }
  }

  changeTab(title) {
    return (e) => {
      title = title.toLowerCase();
      this.setState({selectedTab: title});
      let id = this.props.params.id;
      if (title === "story") {
        this.props.router.push(`/campaigns/${id}`);
      } else {
        this.props.router.push(`/campaigns/${id}/${title}`);
      }
    }
  }

  linkToProfile(e) {
    e.preventDefault();
    let authorId = this.props.author.id;
    this.props.router.push(`/profile/${authorId}`);
  }

  update() {
    return (e) => {
      let targetVal = parseInt(e.target.value);
      let contribution = merge({},
                               this.state.contribution,
                               {amount: targetVal});
      let newState = merge({}, this.state, {contribution});
      this.setState(newState);
    }
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  renderModal() {
    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        transform             : 'translate(-50%, -50%)',
        maxWidth              : '600px'
      }
    };

    let contributionAmount = this.state.contribution.amount;
    let campaignTitle = this.props.campaign.title;
    let formTitle = (contributionAmount.toString().length > 0 && contributionAmount.toString() != "NaN")
                    ? `Contribute $${contributionAmount} to ${campaignTitle}?` : `Contribute to ${campaignTitle}?`;
    let firstName = "";
    let lastName = "";
    if (this.props.currentUser) {
      firstName = this.props.currentUser.first_name;
      lastName = this.props.currentUser.last_name;
    }

    if (this.state.reward.title) {

    } else {
      return(
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Checkout" >

            <i className="fa fa-times modal-close clickable" aria-hidden="true" onClick={this.closeModal}></i>
            <p className="checkoutTitle">{formTitle}</p>
            <div className="checkoutForm">
              <div>
                <label>First Name
                  <input type="text" name="firstName" defaultValue={firstName}/>
                </label>
                <label>Last Name
                  <input type="text" name="lastName" defaultValue={lastName}/>
                </label>
              </div>
              <div className="contribution-info">
                <label>Contribution Amount
                  <div className="contribute-button-container">
                    <span className="contribute-button-box">
                      $&nbsp;<input type="text"
                      name="contributionAmount" defaultValue={contributionAmount}/>
                    </span>
                  </div>
                </label>
                <div className="reward-title-box">
                  No Reward Selected
                </div>
              </div>
              <div className="financial-container">
                <div className="financial-overlay">
                  <p>StartupGoGo is for demo purposes only, no actual money is exchanged.</p>
                </div>
                <div className="credit-info-container">
                  <label>Name on Card
                    <input type="text" disabled="true"/>
                  </label>
                  <label>Card Number
                    <input type="text" disabled="true"/>
                  </label>
                </div>
                <div className="credit-info-container-two group">
                  <label>Exp. Date
                    <input type="text" disabled="true"/>
                  </label>
                  <label>CCV
                    <input type="text" disabled="true"/>
                  </label>
                  <label>Postal Code
                    <input type="text" disabled="true"/>
                  </label>
                </div>
              </div>
              <button className="button clickable">Submit Contribution</button>
            </div>
        </Modal>
      );
    }
  }

  startCheckout(e) {
    // temporary:
    if (!this.props.currentUser) {
      return alert('Please log in or Sign Up to Contribute.');
    }

    let target = e.target;
    let input = target.previousSibling;
    this.setState({modalIsOpen: true});
    // this.setState({buttonText: "Confirm"})
    // target.addEventListener("click", this.confirmCheckout);
    // $(target).closest('.contribute-button-container').mouseleave(
    //   () => {
    //     this.setState({buttonText: "Contribute"});
    //     target.removeEventListener("click", this.confirmCheckout);
    //   }
    // );
  }

  confirmCheckout(e) {
    const _nullContribution = {
      user_id: null,
      campaign_id: null,
      reward_id: null,
      amount: ""
    }

    e.preventDefault();
    let target = e.target;
    target.removeEventListener("click", this.confirmCheckout);

    let contribution = this.state.contribution;
    let amount = this.props.campaign.funds_received + this.state.contribution.amount;
    let campaign = Object.assign({}, this.props.campaign, {funds_received: amount});
    this.props.createContribution({contribution});
    this.props.updateCampaign({campaign});
    this.setState({contribution: _nullContribution});
  }

  tabContent() {
    let selectedTab = this.state.selectedTab;

    if (selectedTab === 'story') {
      return (
        <p>{this.props.campaign.campaign_pitch}</p>
      )
    } else if (selectedTab === 'backers') {
      return (
        <ul className="backers-list">
          {this.backers()}
        </ul>
      )
    }
  }

  backers() {
    const linkToProfile = (id) => {
      return (e) => {
        this.props.router.push(`/profile/${id}`);
      }
    }

    if (this.props.campaign) {
      if (this.props.campaign.contributors) {
        let backers = this.props.campaign.contributors;
        let backersKeys = Object.keys(backers).map( id => parseInt(id));
          return (
            backersKeys.map( (id) => (
              <li key={id} className="clickable" onClick={linkToProfile(id)}>
                <img src={backers[id].small_photo_url}/>
                <div className="backer-info">
                  <span>{backers[id].first_name} {backers[id].last_name}</span>
                  <span>{backers[id].city}, {backers[id].country}</span>
                </div>
              </li>
            ))
          )
      }
    }
  }

  render() {
    const children = this.props.children;

    const campaignTabs = [
      "Story",
      "Backers"
    ]

    const loadClass = () => {
      if (this.props.loading && !this.state.imageLoaded) {
        return "loading";
      } else {
        return "";
      }
    }

    const loader = () => {

      return (
        <div id="loading-screen" className={loadClass()}>
          <div className="loader-container">
            <div className="loader">
              <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
              </svg>
            </div>
          </div>
        </div>
      )
    };

    return(
      <div className="campaign-show">
        {loader()}
        {this.renderModal()}
        <div className="campaign-show-container container group">
          <div className="grid-7 alpha pitch-image-container">
            <img
              src={this.state.campaignPitchImageUrl}
              onLoad={this.handleImageLoaded}/>
          </div>
          <div className="grid-5 omega campaign-info">
            <h4>{this.props.campaign.title} by {this.props.author.first_name} {this.props.author.last_name}</h4>
            <p>{this.props.campaign.tagline}</p>
            <div onClick={this.linkToProfile} className="campaign-author-container clickable">
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
              daysLeft={this.endDateToDuration(this.props.campaign.duration)}
              endDateToDuration={(endDate) => this.endDateToDuration(endDate)}/>
            <div className="contribute-button-container">
              <span className="contribute-button-box">
                $&nbsp;<input type="text"
                value={(isNaN(this.state.contribution.amount)) ? "" : this.state.contribution.amount}
                onChange={this.update()}/>
              </span>
              <button className="clickable button" onClick={this.startCheckout}>{this.state.buttonText}</button>
            </div>
          </div>
          <div className="grid-7 campaign-content-main alpha">
            <div className="campaign-overview">
              <div className="campaign-header">
                <h4>Overview</h4>
              </div>
              <p>{this.props.campaign.campaign_overview}</p>
            </div>
            <div className="campaign-tabs-container">
              <ul className="campaign-tabs">
                {campaignTabs.map( (title, idx) => (
                  <li key={idx} className={this.tabClass(title)} onClick={this.changeTab(title)}><h4>{title}</h4></li>
                ))}
              </ul>
              {this.tabContent()}
            </div>
          </div>
          <div className="grid-4 campaign-content-sidebar alpha">
            <div className="campaign-header">
              <h4>Rewards</h4>
            </div>
            <Rewards
              rewards={this.props.rewards}
              contribution={this.state.contribution}
              campaign={this.props.campaign}
              createContribution={this.props.createContribution}
              currentUser={this.props.currentUser}
              updateCampaign={this.props.updateCampaign}/>
          </div>
        </div>
      </div>
    )
  }

}

export default withRouter(CampaignShow);

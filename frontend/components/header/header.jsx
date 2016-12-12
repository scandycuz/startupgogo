import React from 'react';
import UserMenu from './user_menu';
import { Router, Route, IndexRoute, hashHistory, withRouter } from 'react-router';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.redirectHome = this.redirectHome.bind(this);
    this.linkToPitch = this.linkToPitch.bind(this);
    this.setFormToLogin = this.setFormToLogin.bind(this);

    this.state = {
      modalIsOpen: false,
      formType: "login",
      redirect: null
    }
  }

  componentDidMount() {
    if (this.props.currentUser) {
      this.props.requestUserCampaigns(this.props.currentUser.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.currentUser && nextProps.currentUser) {
      this.props.requestUserCampaigns(nextProps.currentUser.id);
      this.props.requestCampaigns();
      if (this.state.redirect) {
        let redirect = this.state.redirect;
        this.setState({redirect: null});
        this.props.router.push(redirect);
      }
    }
  }

  redirectHome() {
    this.props.router.push("/");
  }

  setFormToLogin() {
    this.setState({formType: "login"});
  }

  linkToPitch(e) {
    e.preventDefault();
    if (this.props.currentUser) {
      this.props.router.push('/pitch-a-startup');
    } else {
      this.setState({
        formType: "login",
        modalIsOpen: true,
        redirect: '/pitch-a-startup'
      });
    }
  }

  render() {

    return(
      <header className="siteHeader">
        <div className="siteHeader-content-left">
          <h1 className="siteLogo" onClick={this.redirectHome}>StartupGoGo</h1>
          <ul>
            <li></li>
          </ul>
        </div>
        <div className="siteHeader-content-right">
          <a href="#" className="siteHeader-button button"
             onClick={this.linkToPitch}>Pitch A Startup</a>
          <UserMenu
            processForm={this.props.processForm}
            logout={this.props.logout}
            currentUser={this.props.currentUser}
            loggedIn={this.props.loggedIn}
            receiveSessionErrors={this.props.receiveSessionErrors}
            errors={this.props.errors}
            campaigns={this.props.campaigns}
            router={this.props.router}
            requestUserCampaigns={this.props.requestUserCampaigns}
            requestSingleCampaign={this.props.requestSingleCampaign}
            modalIsOpen={this.state.modalIsOpen}
            redirect={this.state.redirect}
            router={this.props.router}
            formType={this.state.formType}/>
        </div>
      </header>
    )
  }

}

export default withRouter(Header);

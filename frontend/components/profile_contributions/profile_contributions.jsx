import React from 'react';
import { Router, Route, IndexRoute, hashHistory, withRouter } from 'react-router';

class ProfileContributions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPath: this.props.currentPath
    }
  }

  render() {

    return(
      <div>
        <h3>Contributions</h3>
      </div>
    )
  }

}

export default withRouter(ProfileContributions);

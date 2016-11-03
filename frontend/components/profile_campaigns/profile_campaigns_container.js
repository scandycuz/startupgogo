import { connect } from 'react-redux';
import ProfileCampaigns from './profile_campaigns';

const mapStateToProps = ({session}) => {
  return ({

  })
};

const mapDispatchToProps = (dispatch, { location }) => {
  let currentPathName = location.pathname.split("/").pop();
  let currentPath = (["Campaigns", "Contributions"].includes(currentPathName)) ? currentPathName : 'Profile';

  return({
    currentPath: currentPath
  })
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileCampaigns);
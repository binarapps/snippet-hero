import alt from '../libs/alt';
import ProfileActions from '../actions/profile-actions';

class ProfileStore {
  constructor() {
    this.bindActions(ProfileActions);
    this.state = { profile: null };
  }

  getProfile(data) {
    if(data.ok){
      this.setState({ profile: data.profile });
    }
  }
}

export default alt.createStore(ProfileStore, 'ProfileStore');

import alt from '../libs/alt';
import FlashMessagesActions from '../actions/flash-messages-actions';

class FlashMessagesStore {
  constructor() {
    this.bindActions(FlashMessagesActions);
    this.state = { flashMessages: [] };
  }

  pushMessage(message) {
    this.setState({ flashMessages: this.state.flashMessages.concat([message]) });
  }
}

export default alt.createStore(FlashMessagesStore, 'FlashMessagesStore');

import alt from '../libs/alt';

class FlashMessagesActions {

  pushMessage(message) {
    this.dispatch(message);
  }

}
export default alt.createActions(FlashMessagesActions);

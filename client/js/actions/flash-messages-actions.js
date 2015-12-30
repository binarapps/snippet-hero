import axios from 'axios';
import alt from '../libs/alt';

class flashMessagesActions {

  pushMessage(message) {
    this.dispatch(message);
  }

}
export default alt.createActions(flashMessagesActions);

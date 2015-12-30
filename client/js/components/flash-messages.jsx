import React from 'react';
import Snackbar from 'material-ui/lib/snackbar';
import FlashMessagesStore from '../stores/flash-messages-store';

export default class FlashMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lastFlashMessage: false };

    this._onStoreChanged = this._onStoreChanged.bind(this);

    FlashMessagesStore.listen(this._onStoreChanged);
  }

  componentWillUnmount() {
    FlashMessagesStore.unlisten(this._onStoreChanged);
  }

  _onStoreChanged() {
    var flashMessages = FlashMessagesStore.state.flashMessages;
    if (flashMessages.length > 0) {
      this.setState({ lastFlashMessage: flashMessages[flashMessages.length - 1] });
    }
    this.refs.snackbar.show();
  }

  render() {
    return (
      <div>
        <Snackbar message={this.state.lastFlashMessage.content || ''}
                  ref="snackbar"
                  autoHideDuration={this.state.lastFlashMessage.duration || 3000}
                  />
      </div>
    );
  }
}

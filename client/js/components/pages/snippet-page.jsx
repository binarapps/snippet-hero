import React from 'react';
import PageWrapper from '../page-wrapper';
import SnippetsList from '../snippets/snippets-list';
import SnippetActions from '../../actions/snippet-actions';
import SnippetStore from '../../stores/snippet-store';

export default class SnippetPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { snippets: [] };
    this._onChange = this._onChange.bind(this);
    this.fetchSnippet = this.fetchSnippet.bind(this);
  }

  componentDidMount() {
    this.storeListeners = [];
    this.storeListeners.push(SnippetStore.listen(this._onChange));
    this.fetchSnippet(this.props.params.id);
  }

  componentWillReceiveProps(props) {
    if(props.params && props.params.id) {
      this.fetchSnippet(props.params.id);
    }
  }

  fetchSnippet(snippetId) {
    if(!this.getSnippet(snippetId).length) {
      SnippetActions.getSnippet(snippetId);
    }
  }

  getSnippet(snippetId) {
    return this.state.snippets.filter(s => s.id == snippetId);
  }

  componentWillUnmount() {
    this.storeListeners.forEach(unlisten => unlisten());
  }

  _onChange() {
    this.setState({ snippets: SnippetStore.getState().snippets });
  }

  render() {
    let snippetId = this.props.params.id;
    let foundSnippets = this.getSnippet(snippetId);

    return (
      <PageWrapper>
        <h2 style={{fontSize: '24px', margin: '20px 0'}}>Snippet no. {snippetId}:</h2>
        <div style={{clear: 'right'}}>
          {(() => {
            if(foundSnippets.length > 0){
              return (
                <div>
                  <SnippetsList snippets={foundSnippets} history={this.props.history}/>
                </div>
              );
            } else {
              return (
                <h2 style={{textAlign: 'center', fontWeight: 'normal', paddingTop: '30px'}}>
                  Sorry, didn't find a snippet you were looking for.
                </h2>
              );
            }
          })()}
      </div>
      </PageWrapper>
    );
  }
}

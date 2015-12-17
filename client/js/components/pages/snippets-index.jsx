import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import PageWrapper from '../page-wrapper';
import TextField from 'material-ui/lib/text-field';
import SnippetsList from '../snippets/snippets-list';
import SnippetFormDialog from '../snippets/snippet-form-dialog';
import SnippetActions from '../../actions/snippet-actions';
import SnippetStore from '../../stores/snippet-store';
import SnippetSearchStore from '../../stores/snippet-search-store';

class SnippetsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { snippets: [] };
    this._searchSnippets = this._searchSnippets.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount () {
    this.storeListeners = [];
    this.storeListeners.push(SnippetStore.listen(this.onChange));
    this.storeListeners.push(SnippetSearchStore.listen(this.onSearch));
    SnippetActions.getAll();
  }

  getPropsFromStores () {
    return SnippetStore.getState();
  }

  getPropsFromSearchStore () {
    return SnippetSearchStore.getState();
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getPropsFromStores(nextProps, this.context));
  }

  componentWillUnmount() {
    this.storeListeners.forEach(unlisten => unlisten());
  }

  onChange() {
    this.setState(this.getPropsFromStores(this.state, this.context));
  }

  onSearch() {
    this.setState(this.getPropsFromSearchStore(this.state, this.context));
  }

  _searchSnippets () {
    SnippetActions.search(this.refs.search.getValue());
  }

  render() {
    const languages = [{value: 0, label: ''}, {value: 1, label: 'JavaScript'}];

    return (
      <PageWrapper>
        <RaisedButton onClick={ () => this.refs.dialog.open()} label="Add new snippet" primary={true}/>
        <h2 style={{fontSize: '24px', margin: '20px 0'}}>All snippets:</h2>
        <TextField floatingLabelText="Enter snippet description (optional):"
                   fullWidth={true}
                   type="text"
                   ref="search" />
        <RaisedButton onClick={this._searchSnippets} label="Search" secondary={true}/>
        <SnippetsList snippets={this.state.snippets}/>
        <SnippetFormDialog ref="dialog"
                           languages={languages} />
      </PageWrapper>
    );
  }
}

export default SnippetsIndex;

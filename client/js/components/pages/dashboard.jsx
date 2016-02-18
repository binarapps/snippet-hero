import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import UserStore from '../../stores/user-store';
import PageWrapper from '../page-wrapper';
import DashboardStore from '../../stores/dashboard-store';
import SnippetStore from '../../stores/snippet-store';
import DashboardActions from '../../actions/dashboard-actions';
import SnippetActions from '../../actions/snippet-actions';
import CommentsList from '../comments/comment-list';
import SnippetsList from '../snippets/snippets-list';

export default class Dashboard extends React.Component {
  constructor (props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this.state = this.getPropsFromStores();
  }

  componentDidMount() {
    this.storeListeners = [];
    this.storeListeners.push(DashboardStore.listen(this._onChange));
    this.storeListeners.push(SnippetStore.listen(this._onChange));
  }

  componentWillUnmount() {
    this.storeListeners.forEach(unlisten => unlisten());
  }

  componentWillMount () {
    let currentUser = UserStore.getState().currentUser;
    DashboardActions.getDashboardFeed();
    SnippetActions.getBestSnippets(currentUser.id);
  }

  getPropsFromStores() {
    let dashboard = DashboardStore.getState();
    let snippets = SnippetStore.getState();
    return {dashboard: dashboard, snippets: snippets};
  }

  _onChange () {
    this.setState(this.getPropsFromStores());
  }

  render() {
    let currentUser = UserStore.getState().currentUser;
    return (
      <PageWrapper>
        <h2>Hello { currentUser ? currentUser.name : 'guest'}!!!!</h2>
        <div className='row' style={{marginBottom: '15px'}}>
          <div className='col-xs-12 col-sm-6'>
            <Card>
              <CardTitle title="Last comments for your snippets:" />
              <CardText>
                <CommentsList comments={this.state.dashboard.lastComments} withSnippetName={true}></CommentsList>
              </CardText>
            </Card>
          </div>
          <div className='col-xs-12 col-sm-6'>
            <Card>
              <CardTitle title={'This month you\'ve posted ' + this.state.dashboard.thisMonthSnippetsCount + ' snippets' } subtitle='Showing last 3'/>
              <CardText>
                <SnippetsList snippets={this.state.dashboard.lastSnippets} withComments={false} withRatings={false} ></SnippetsList>
              </CardText>
            </Card>
          </div>
        </div>
        <div className='row' style={{marginBottom: '15px'}}>
          <div className='col-xs-12 col-sm-12'>
            <Card>
              <CardTitle title={'This month\'s best rated snippets' } subtitle='Showing best 5'/>
              <CardText>
                <SnippetsList snippets={this.state.snippets.bestSnippets} withComments={false} withRatings={true} ></SnippetsList>
              </CardText>
            </Card>
          </div>
        </div>
      </PageWrapper>
    );
  }
}

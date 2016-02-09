import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import UserStore from '../../stores/user-store';
import PageWrapper from '../page-wrapper';
import DashboardStore from '../../stores/dashboard-store';
import DashboardActions from '../../actions/dashboard-actions';
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
  }

  componentWillUnmount() {
    this.storeListeners.forEach(unlisten => unlisten());
  }

  componentWillMount () {
    DashboardActions.getDashboardFeed();
  }

  getPropsFromStores() {
    return DashboardStore.getState();
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
                <CommentsList comments={this.state.lastComments} withSnippetName={true}></CommentsList>
              </CardText>
            </Card>
          </div>
          <div className='col-xs-12 col-sm-6'>
            <Card>
              <CardTitle title={'This month you\'ve posted ' + this.state.thisMonthSnippetsCount + ' snippets' } subtitle='Showing last 3'/>
              <CardText>
                <SnippetsList snippets={this.state.lastSnippets} withComments={false} withRatings={false} ></SnippetsList>
              </CardText>
            </Card>
          </div>
        </div>
      </PageWrapper>
    );
  }
}

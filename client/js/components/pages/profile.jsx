import React from 'react';
import PageWrapper from '../page-wrapper';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import CardHeader from 'material-ui/lib/card/card-header';
import CardTitle from 'material-ui/lib/card/card-title';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import Paper from 'material-ui/lib/paper';
import {generateColor} from '../mixins/color-generate';
import ProfileStore from '../../stores/profile-store';
import ProfileActions from '../../actions/profile-actions';
import SnippetsList from '../snippets/snippets-list';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this.state = { profile: null }
  }

  componentDidMount(){
    this.storeListeners = [];
    this.storeListeners.push(ProfileStore.listen(this._onChange));
    ProfileActions.getProfile(this.props.params.id);
    this.setState({ profile: null });
  }

  _onChange() {
    this.setState(ProfileStore.getState());
  }

  componentWillReceiveProps(nextProps) {
    ProfileActions.getProfile(nextProps.params.id);
    this.setState({ profile: null });
  }

  componentWillUnmount() {
    this.storeListeners.forEach(unlisten => unlisten());
  }

  render(){
    let s = this.state;
    let userName = '';
    let userEmail = '';
    let commentCount = 0;
    let ratingCount = 0;
    let totalAvg = 0;
    let snippets = {};

    if(s.profile) {
      userName = s.profile.name;
      userEmail = s.profile.email;
      commentCount = s.profile.commentsCount;
      ratingCount = s.profile.ratingsCount;
      totalAvg = s.profile.totalAvg.toFixed(2);
      if(s.profile.snippets){
        snippets = s.profile.snippets;
      }
    }

    let avatar = (<Avatar
          color={generateColor()}
          backgroundColor={generateColor()}
          style={{height: '75px', width: '75px', lineHeight: '75px', fontSize: '48px'}}>
          {userName ? userName.split('')[0].toUpperCase() : 'X'}
        </Avatar>);
    let achievementStyle = {height: 'auto', width: 'auto', margin: '20px 50px', textAlign: 'center', display: 'inline-block', padding: '20px'};
    let numberAchievementEvenStyle = {color: '#FC2C7A', fontSize: '60px'};
    let numberAchievementOddStyle = {color: '#18B8D0', fontSize: '60px'};
    let subtitleAchievementStyle = {fontSize: '16px'};
    let snippetListing = (<Card>
          <CardTitle title="Snippets:" />
          <CardText>
            <SnippetsList snippets={snippets} withComments={true} withRatings={true} history={this.props.history}></SnippetsList>
          </CardText>
        </Card>);

    return(
      <PageWrapper>
        <Card className="profile-summary" style={{display: 'inline-flex', background: Colors.grey100, height: 'auto', width: '100%', 'textAlign': 'center'}}>
          <CardHeader
            title={userName}
            subtitle= {userEmail}
            avatar={avatar}
            style={{height: '50%', width: '100%'}}
            titleStyle={{fontSize: '32px'}}
            subtitleStyle={{fontSize: '26px'}} />
          <div style={{borderBottom: '1px solid', borderTop: '1px solid', borderColor: Colors.grey300}}/>
          <CardText className="profile-stats" >
            <Paper style={achievementStyle} zDepth={2} circle={true}>
              <span style={numberAchievementOddStyle}>{snippets.length}</span><br/>
              <span style={subtitleAchievementStyle}> snippets added </span>
            </Paper>
            <Paper style={achievementStyle} zDepth={2} circle={true}>
              <span style={numberAchievementEvenStyle}>{commentCount}</span><br/>
              <span style={subtitleAchievementStyle}> comments added </span>
            </Paper>
            <Paper style={achievementStyle} zDepth={2} circle={true}>
              <span style={numberAchievementOddStyle}>{ratingCount}</span><br/>
              <span style={subtitleAchievementStyle}> snippets rated on </span>
            </Paper>
            <Paper style={achievementStyle} zDepth={2} circle={true}>
              <span style={numberAchievementEvenStyle}>{totalAvg}</span><br/>
              <span style={subtitleAchievementStyle}> avarage rating </span>
            </Paper>
          </CardText>
        </Card>
        { snippets.length > 0 ? snippetListing : '' }
      </PageWrapper>
    );
  }

}

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
    this.state = this.getPropsFromStores();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount(){
    this.storeListeners = [];
    this.storeListeners.push(ProfileStore.listen(this._onChange));
    var reg = new RegExp('profiles\/([0-9]+)');
    var userId = (this.props.location.pathname).match(reg)[1];
    ProfileActions.getProfile(userId);
  }

  _onChange() {
    this.setState(this.getPropsFromStores(this.state, this.context));
  }

  getPropsFromStores() {
    return ProfileStore.getState();
  }

  render(){
    let s = this.state;
    let userName = (s.profile ? s.profile.name : '');
    let userEmail = (s.profile ? s.profile.email : '');
    let commentCount = (s.profile ? s.profile.commentsCount : 0);
    let ratingCount = (s.profile ? s.profile.ratingsCount : 0);
    let snippets = (s.profile && s.profile.snippets ? s.profile.snippets : {});
    let totalAvg = (s.profile ? s.profile.totalAvg : 0);

    let avatar = (<Avatar
          color={generateColor()}
          backgroundColor={generateColor()}
          style={{height: '75px', width: '75px', lineHeight: '75px', fontSize: '48px'}}>
          {userName ? userName.split('')[0].toUpperCase() : 'X'}
        </Avatar>);

    let achievementStyle = {height: 'auto', width: 'auto', margin: '20px 50px', textAlign: 'center', display: 'inline-block', padding: '20px'};

    let snippetListing = (<Card>
          <CardTitle title={'Snippets:' } />
          <CardText>
            <SnippetsList snippets={snippets} withComments={false} withRatings={false} ></SnippetsList>
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
              <span className="numberAchievementOdd">{snippets.length}</span><br/>
              <span className="subtitleAchievement"> snippets added </span>
            </Paper>
            <Paper style={achievementStyle} zDepth={2} circle={true}>
              <span className="numberAchievementEven">{commentCount}</span><br/>
              <span className="subtitleAchievement"> comments added </span>
            </Paper>
            <Paper style={achievementStyle} zDepth={2} circle={true}>
              <span className="numberAchievementOdd">{ratingCount}</span><br/>
              <span className="subtitleAchievement"> snippets rated on </span>
            </Paper>
            <Paper style={achievementStyle} zDepth={2} circle={true}>
              <span className="numberAchievementEven">{totalAvg}</span><br/>
              <span className="subtitleAchievement"> avarage rating </span>
            </Paper>
          </CardText>
        </Card>
        {(() => {
          if(snippets.length > 0){
            return snippetListing;
          }
        })()}
      </PageWrapper>
    );
  }

}
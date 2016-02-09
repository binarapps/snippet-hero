import React from 'react';
import PageWrapper from '../page-wrapper';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import CardHeader from 'material-ui/lib/card/card-header';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import Paper from 'material-ui/lib/paper';
import {generateColor} from '../mixins/color-generate';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){

    let avatar = (<Avatar
          color={generateColor()}
          backgroundColor={generateColor()}
          style={{height: '75px', width: '75px', lineHeight: '75px', fontSize: '48px'}}>
          {'X'}
        </Avatar>);

    let achievementStyle = {height: 'auto', width: 'auto', margin: '20px 50px', textAlign: 'center', display: 'inline-block', padding: '20px'};

    return(
      <PageWrapper>
        <Card className="profile-summary" style={{display: 'inline-flex', background: Colors.grey100, height: 'auto', width: '100%', 'text-align': 'center'}}>
          <CardHeader
            title={'No title'}
            subtitle= {'subtitle'}
            avatar={avatar}
            style={{height: '50%', width: '100%'}}
            titleStyle={{fontSize: '32px'}}
            subtitleStyle={{fontSize: '26px'}} />
          <div style={{borderBottom: '1px solid', borderTop: '1px solid', borderColor: Colors.grey300}}/>
          <CardText className="profile-stats" >
            <Paper style={achievementStyle} zDepth={2} circle={true}>
              <span className="numberAchievementOdd">24</span><br/>
              <span className="subtitleAchievement"> snippets added </span>
            </Paper>
            <Paper style={achievementStyle} zDepth={2} circle={true}>
              <span className="numberAchievementEven">15</span><br/>
              <span className="subtitleAchievement"> comments added </span>
            </Paper>
            <Paper style={achievementStyle} zDepth={2} circle={true}>
              <span className="numberAchievementOdd">100</span><br/>
              <span className="subtitleAchievement"> snippets rated on </span>
            </Paper>
            <Paper style={achievementStyle} zDepth={2} circle={true}>
              <span className="numberAchievementEven">4.5</span><br/>
              <span className="subtitleAchievement"> avarage rating </span>
            </Paper>
          </CardText>
        </Card>
      </PageWrapper>
    );
  }

}
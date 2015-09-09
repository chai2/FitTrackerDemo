'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var api = require('../Utils/api');
var Dashboard = require('./Dashboard');
var Friends = require('./friends');
var Signin = require('./Signin');

var {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bg: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: windowSize.width,
      height: windowSize.height
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  logo: {
      width: 150,
      height: 150
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});

class Leaderboard extends React.Component{

  constructor(props){
    super(props)

    console.log("In leaderboard in constr", this.props.userInfo);
    console.log("In leaderboard friends in constr", this.props.friendsInfo.friends[0].user.topBadges[0].timesAchieved);

  }

  render(){
    return (
      <View style={styles.container}>
      <Image style={styles.bg} source={{uri: 'http://i.imgur.com/xlQ56UK.jpg'}} />
      <Text style={styles.instructions}>
        My Something {this.props.userInfo.user.displayName}
      </Text>

      <Image style={styles.logo}
        source={{uri: 'http://static0.fitbit.com/images/badges_new/386px/shareLocalized/en_US/badge_daily_steps5k.png'}} >
      </Image>
      </View>
    );
  }
};

module.exports = Leaderboard;

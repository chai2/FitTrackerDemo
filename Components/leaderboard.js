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
    backgroundColor: 'transparent'
  },
  bg: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: windowSize.width,
      height: windowSize.height
  },
  signup: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: .15
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
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
    console.log("In leaderboard in constr" + this.props.navigate);
  }

  render(){
    return (
      <View style={styles.container}>
      <Image style={styles.bg} source={{uri: 'http://i.imgur.com/xlQ56UK.jpg'}} />
        <Text>My Something</Text>
      </View>
    );
  }
};

module.exports = Leaderboard;

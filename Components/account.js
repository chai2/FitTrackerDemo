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
  }
});

class Account extends React.Component{

  render(){

    return (
      <View style={styles.container}>
        <Text>My Account</Text>
      </View>
    );
  }
};

module.exports = Account;

'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var api = require('../Utils/api');
var Parse = require('parse').Parse;
var Dashboard = require('./Dashboard');
var Friends = require('./friends');
var Signin = require('./Signin');

var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

Parse.initialize('Wyf2z9CIprx4iRDm7GCnCXbH7hlWkCr44aLkP7De','56ejFKXCGa01h0eYnaPXteYmbfJKDzNPHowdQbgW');

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
});

class Account extends React.Component{

  // handleLogout(){
  //   Parse.User.logOut();
  //   var currentUser = Parse.User.current();
  //   console.log("logged out");
  //   this.props.navigate.push({
  //     title: 'Sign In',
  //     component: Signin
  //   });
  //
  // }

  render(){
    // var currentUser = Parse.User.current();

    // console.log("Current user", Parse.User.current());

    return (
      <View style={styles.container}>
      <Image style={styles.bg} source={{uri: 'http://i.imgur.com/xlQ56UK.jpg'}} />
        <Text>My Account</Text>
      </View>
    );
  }
};

module.exports = Account;

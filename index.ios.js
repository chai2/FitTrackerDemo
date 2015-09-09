/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Main = require('./Components/Main');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} = React;

var FitTracker = React.createClass({
  hideNavBar: function(){
    this.setState({hideNavBar: true});
  },

  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'FitApp',
          component: Main,
          passProps: {myProp: 'boom', hideNavBar: true}
        }}/>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('FitTracker', () => FitTracker);

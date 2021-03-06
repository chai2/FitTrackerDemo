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

  getInitialState: function(){
    return{
      isNavBarHidden: false
    };
  },

  hideNavBar: function(){
    this.setState({hideNavBar: true});
  },

  render: function() {
    return (
      <NavigatorIOS
        barTintColor='#69E3C8'
        titleTextColor='#fff'
        navigationBarHidden={this.state.isNavBarHidden}
        style={styles.container}
        initialRoute={{
          title: 'Fit Tracker',
          component: Main,
          passProps: {hideNavBar: this.state.hideNavBar},
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

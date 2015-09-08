'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Parse = require('parse').Parse;
var Account = require('./account');
var Dashboard = require('./Dashboard');
var config = require('../config');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  LinkingIOS,
  Image
} = React

function fitbitOauth (app_key, callback) {
  var state = Math.random() + ''

  LinkingIOS.addEventListener('url', handleUrl)

  function handleUrl (event) {
    var [, query_string] = event.url.match(/\#(.*)/)
    var query = shittyQs(query_string)
    if (state === query.state) {
      callback(null, query.access_token, query.uid)
    } else {
      callback(new Error('Oauth2 security error'))
    }
    LinkingIOS.removeEventListener('url', handleUrl)
  }

  LinkingIOS.openURL([
    'https://www.fitbit.com/oauth2/authorize',
    '?response_type=token',
    '&client_id=' + '229VHT',
    '&redirect_uri=fitapp://authorizedoyou',
    `&state=${state}`,
    '&scope=profile+social',
    '&expires_in=2592000'
  ].join(''))
}

var Friends = React.createClass({
  componentDidMount: function () {
    fitbitOauth(config.app_key, (err, access_token) => {
      if (err) { console.log(err) }
      this.setState({ access_token: access_token })
    })
    console.log("bom");
  },

  getUserInfo: function(res) {
    var userInfo = res;
    // userInfo.name = res.displayName;
    console.log(userInfo);
  },

  onMakeFolderPressed: function () {
    // console.log(this.state && this.state.access_token);
    fetch(
      'https://api.fitbit.com/1/user/-/profile.json',
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.state && this.state.access_token}`
        }
      }
    ).then((res) => this.getUserInfo(res))
  },
  render: function() {
    return (


      <View style={styles.container}>
      <Image style={styles.bg} source={{uri: 'http://i.imgur.com/xlQ56UK.jpg'}} />
        <TouchableHighlight
            style={styles.signup}>
            <Text>My Friends</Text>
        </TouchableHighlight>
        <Text style={styles.instructions}>
          Access Token: {this.state && this.state.access_token}
        </Text>
        <TouchableHighlight
          onPress={this.onMakeFolderPressed.bind(this)}>
          <Text>Get Data</Text>
        </TouchableHighlight>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});

module.exports = Friends;

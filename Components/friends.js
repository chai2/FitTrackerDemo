'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Account = require('./account');
var Leaderboard = require('./leaderboard');
var Dashboard = require('./Dashboard');
var config = require('../config');
var shittyQs = require('shitty-qs');
var api = require('../Utils/api.js');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  LinkingIOS,
  Image,
  ListView,
  SegmentedControlIOS
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
    '&client_id=' + '229VKW',
    '&redirect_uri=leaderboard://authy',
    `&state=${state}`,
    '&scope=profile social weight activity location heartrate activity settings sleep',
    '&expires_in=2592000'
  ].join(''))
}

var userInfo;
var friendsInfo;

var Friends = React.createClass({

  getInitialState: function() {
    return {
      accessToken: this.props.access_token,
      featuredCollectionsDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      allCollectionsDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      selectedTab: 'Leaderboard',
      loaded: false
    }
  },

  componentDidMount: function () {
    var state = Math.random() + ''

    fitbitOauth(config.fitbit_app_key, (err, access_token) => {
      if (err) {
        console.log(err)
      }
      this.setState({
        access_token: access_token
      })
    })
      // Placeholder Methods
      // api.fetchFriendsInfo(state, access_token)
      // .then((responseData) => {
      //   this.setState({
      //     friendsCollectionsDataSource: this.state.friendsCollectionsDataSource.cloneWithRows(responseData.friends),
      //     loaded: true
      //   })
      // })
      //
      //   api.fetchUserInfo(state, access_token)
      //   .then((responseData) => {
      //     this.setState({
      //       UserCollectionsDataSource: this.state.UserCollectionsDataSource.cloneWithRows(responseData),
      //     })
      //   })
  },

  onGetInfo: function () {

    var user = fetch(
      'https://api.fitbit.com/1/user/-/profile.json',
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.state && this.state.access_token}`
        }
      }
    ).then((res) => res.json()).then((res) => { userInfo = res; })

    var friends = fetch(
      'https://api.fitbit.com/1/user/-/friends.json',
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.state && this.state.access_token}`
        }
      }
    ).then((res) => res.json()).then((res) => { friendsInfo = res; console.log(friendsInfo);})

  },


  render: function() {

    return (
        <View style={styles.container}>

        <TouchableHighlight onPress={this.onGetInfo.bind(this) }>
            <Text>Get Data</Text>
          </TouchableHighlight>
          <SegmentedControlIOS
            values={['Leaderboard', 'Friends']}
            selectedIndex={0}
            tintColor={'#69E3C8'}
            onValueChange={(val) => {
              this.setState({
                selectedTab: val
              })
            }} />
            {this.renderListView()}
        </View>
      );
  },

  renderListView: function() {
    if (this.state.selectedTab === 'Featured') {
      return (
        <View style={styles.container}>
          {this.renderLeaderboardCollectionsListView()}
        </View>
        )
    } else if (this.state.selectedTab === 'All') {
      return (
          this.renderFriendsCollectionsListView()
        )
    }
  },

  renderLeaderboardCollectionsListView: function() {
    return (
      <ListView
        dataSource={this.state.friendsCollectionsDataSource}
        renderRow={this.renderCollectionCell}
        style={styles.collectionListView}
        automaticallyAdjustContentInsets={false}
        contentInset={{bottom: 50}} />
        )
  },

  renderFriendsCollectionsListView: function() {
    return (
      <ListView
        dataSource={this.state.friendsCollectionsDataSource}
        style={styles.instructions}
        automaticallyAdjustContentInsets={false}
        contentInset={{bottom: 50}}
       />
      )
  },


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

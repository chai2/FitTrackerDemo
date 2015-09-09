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
    '&client_id=' + '229VM9',
    '&redirect_uri=oauth2example://foo',
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
      console.log("hello:"+access_token);
    })
      // console.log("hello:"+this.access_token);
      // api.fetchFriendsInfo(state, access_token)
      // .then((responseData) => {
      //   this.setState({
      //     friendsCollectionsDataSource: this.state.friendsCollectionsDataSource.cloneWithRows(responseData.friends),
      //     loaded: true
      //   })
      // })
      //
      //
      //
      //   api.fetchUserInfo(state, access_token)
      //   .then((responseData) => {
      //     this.setState({
      //       UserCollectionsDataSource: this.state.UserCollectionsDataSource.cloneWithRows(responseData),
      //     })
      //   })


    // console.log("outside access_token:"+this.access_token);



  },

  //      this.getUserInfo(res))
  //
  //     fetch(
  //       'https://api.fitbit.com/1/user/-/profile.json',
  //       {
  //         method: 'GET',
  //         headers: {
  //           'Authorization': `Bearer ${this.state && this.state.access_token}`
  //         }
  //       }
  //     ).then((res) => res.json()).then((res) => this.getUserInfo(res))
  //   })
  // },
  //
  // api.getFeaturedCollections(this.props.accessToken)
  //   .then((responseData) => {
  //     this.setState({
  //       featuredCollectionsDataSource: this.state.featuredCollectionsDataSource.cloneWithRows(responseData.collections),
  //       loaded: true
  //     })
  //   })
  // .then(() => {
  //   api.getAllCollections(this.props.accessToken)
  //     .then((responseData) => {
  //       this.setState({
  //         allCollectionsDataSource: this.state.allCollectionsDataSource.cloneWithRows(responseData.collections),
  //       })
  //     })
  // })
  // .done()

  // navigatetoLeaderboard: function(user, friends){
  //
  //   var dataf = merge(user,friends);
  //
  //   var Leaderboard = require('./leaderboard');
  //
  //   this.props.navigate.push({
  //     title: 'Leaderboard',
  //     component: Leaderboard,
  //     passProps: {dataf: dataf}
  //   })
  // },

  // getUserInfo: function(res) {
  //
  //   userInfo = res;
  //
  //   // console.log(userInfo);
  //
  //   return userInfo;
  // },
  //
  // getFriendsInfo: function(res){
  //   friendsInfo = res;
  //   // return friendsInfo;
  //
  //   console.log("boomya");
  //
  //   var Leaderboard = require('./leaderboard');
  //
  //   this.props.navigate.push({
  //     title: 'Leaderboard',
  //     component: Leaderboard,
  //     passProps: {userInfo: userInfo, friendsInfo: friendsInfo}
  //   })
  //
  // },

  onMakeFolderPressed: function () {

    // console.log(this.state && this.state.access_token);
    // var user = fetch(
    //   'https://api.fitbit.com/1/user/-/profile.json',
    //   {
    //     method: 'GET',
    //     headers: {
    //       'Authorization': `Bearer ${this.state && this.state.access_token}`
    //     }
    //   }
    // ).then((res) => res.json()).then((res) => this.getUserInfo(res))


    console.log("access after kepress token:"+this.state.access_token);

    var user = fetch(
      'https://api.fitbit.com/1/user/-/profile.json',
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.state && this.state.access_token}`
        }
      }
    ).then((res) => res.json()).then((res) => { userInfo = res; })

    console.log(user);

    var friends = fetch(
      'https://api.fitbit.com/1/user/-/friends.json',
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.state && this.state.access_token}`
        }
      }
    ).then((res) => res.json()).then((res) => { friendsInfo = res; console.log(friendsInfo);})

    var something = friends;

    console.log(something);

    // api.fetchFriendsInfo(this.state, this.state.access_token)
    // .then((responseData) => {
    //   this.setState({
    //     UserCollectionsDataSource: this.state.UserCollectionsDataSource.cloneWithRows(responseData),
    //   })
    // })

    // var friends = fetch(
    //   'https://api.fitbit.com/1/user/-/friends.json',
    //   {
    //     method: 'GET',
    //     headers: {
    //       'Authorization': `Bearer ${this.state && this.state.access_token}`
    //     }
    //   }
    // ).then((res) => res.json()).then((res) => this.getFriendsInfo(res))

  },


  render: function() {

    return (
        <View style={styles.container}>

        <TouchableHighlight onPress={this.onMakeFolderPressed.bind(this) }>
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

    // return (
    //   <View style={styles.container}>
    //     <TouchableHighlight
    //         style={styles.signup}>
    //         <Text>My Friends</Text>
    //     </TouchableHighlight>
    //     <Text style={styles.instructions}>
    //       Access Token: {this.state && this.state.access_token}
    //     </Text>
    //     <TouchableHighlight
    //       onPress={this.onMakeFolderPressed.bind(this)}>
    //       <Text>Get Data</Text>
    //     </TouchableHighlight>
    //   </View>
    // );
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

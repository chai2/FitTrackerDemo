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
} = React;

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

  componentDidMount: function(){
    var state = Math.random() + '';

    console.log("Access token in friends:", this.props);
    // return fetch(
    //   'https://api.fitbit.com/1/user/-/friends.json',
    //   {
    //     method: 'GET',
    //     headers: {
    //       'Authorization': `Bearer ${state && this.props.fitaccess_token}`
    //     }
    //   }
    // ).then((res) => res.json())
    // .then((res) => {
    //   friendsInfo = res;
    // })

  },

  render: function() {
    return (
        <View style={styles.container}>

          <SegmentedControlIOS
            values={['Leaderboard', 'Friends']}
            selectedIndex={0}
            tintColor={'#69E3C8'}
            onValueChange={(val) => {
              this.setState({
                selectedTab: val
              })
            }} />
            <Text> Hello {this.props} </Text>
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

Friends.propTypes = {
  friendsData: React.PropTypes.object.isRequired,
}


module.exports = Friends;

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
var Separator = require('./Helpers/Separator');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  ListView,
  SegmentedControlIOS,
  AppStateIOS,
  ScrollView
} = React;
//
// var userInfo;
// var friendsInfo;


var styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFD',
    flex: 1,
  },
  collectionListView:{
    backgroundColor: '#FFFFFD',
    flex: 1
  },
  segmentControl: {
    flex: 1,
    marginTop: 64
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 15,
    marginTop: 10,
    marginLeft: 5
  },
  badgedescription: {
    alignSelf: 'auto',
    fontSize: 16,
    marginLeft: 5,
    color: 'black'
  }
});

var badgeValuesArr = [];

var Friends = React.createClass({

  getInitialState: function() {

    return {
      // LeaderboardCollectionsDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      // FriendsCollectionsDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      selectedTab: 'Leaderboard',
      loaded: false,
      pushBadgeValues: ''
    }
  },

  componentWillMount: function(){
    var pushBadgeValues = [];
  },

  componentDidMount: function() {
    console.log("here");
    // AppStateIOS.addEventListener('change', this.handleAppStateChange);
  },

  componentWillUnmount: function() {
    // AppStateIOS.removeEventListener('change', this.handleAppStateChange);
  },

  handleAppStateChange: function(state) {
    if (!this.state.loaded) {
      this.getCollectionsData()
    }
  },

  getCollectionsData: function(){
    this.setState({
      LeaderboardCollectionsDataSource: this.props.friendsData[0],
      FriendsCollectionsDataSource: this.props.friendsData[1]
    })
  },

  pushBadgeValues: function(name,avatar,badgetimesachieved){
    var obj = {};
    obj.name = name;
    obj.avatar = avatar;
    obj.badges = badgetimesachieved;
    badgeValuesArr.push(obj);
  },

  render: function() {

    var userFitdata = this.props.friendsData[0];
    var userInfo = this.props.friendsData[1].badges;
    var friendsInfo = this.props.friendsData[2].friends;
    var infoArr = ['username', 'email'];

    // console.log("userInfo", userInfo);
    console.log("this.props.friendsData[0]", this.props.friendsData[0]);

    var my_badge_count = 0;

    for (var item in userInfo){
      my_badge_count = my_badge_count + userInfo[item].timesAchieved;
    }
    this.pushBadgeValues(userFitdata.user.displayName, userFitdata.user.avatar150, my_badge_count );

    var orderedList = [];
    var list = [];
      for (var item in friendsInfo)
      {
        for (var badge in friendsInfo[item])
        {
          var badge_count = 0;
          for (var i=0; i < friendsInfo[item][badge].topBadges.length; i++)
          {
            badge_count = badge_count + friendsInfo[item][badge].topBadges[i].timesAchieved;
          }
        }
        this.pushBadgeValues(friendsInfo[item].user.displayName,friendsInfo[item].user.avatar150, badge_count );
      }

    var sortedBadges = badgeValuesArr.sort(function(a,b){
      return b.badges - a.badges;
    });

    console.log("badgeValuesArr", badgeValuesArr);

    for(var badge in badgeValuesArr)
    {
      console.log("badgeValuesArr[badge].name", badgeValuesArr[badge].name);
      list.push(
          <View style={styles.rowContainer}>
            <Image style={styles.image} source={{uri: badgeValuesArr[badge].avatar}}/>
            <Text style={styles.badgedescription}>Name: {badgeValuesArr[badge].name.charAt(0).toUpperCase() + badgeValuesArr[badge].name.substr(1).toLowerCase()} </Text>
            <Text style={styles.badgedescription}>Badges Earned: {badgeValuesArr[badge].badges}</Text>
            <Separator />
          </View>
      )
    }

    return (
      <ScrollView style={styles.Scrollcontainer}>
        {list}
      </ScrollView>
  )},

  capitalizeTitle: function(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  },

  renderListView: function() {
    if (this.state.selectedTab === 'Leaderboard') {
      return (
        <View style={styles.container}>
          {this.renderLeaderboardCollectionsListView()}
        </View>
        )
    } else if (this.state.selectedTab === 'Friends') {
      return (
          this.renderFriendsCollectionsListView()
        )
    }
  },

  renderLeaderboardCollectionsListView: function() {
    return (
      <ListView
        dataSource={this.state.LeaderboardCollectionsDataSource}
        renderRow={this.renderCollectionCell}
        style={styles.collectionListView}
        automaticallyAdjustContentInsets={false}
        contentInset={{bottom: 50}} />
        )
  },

  renderFriendsCollectionsListView: function() {
    return (
      <ListView
        dataSource={this.state.FriendsCollectionsDataSource}
        style={styles.instructions}
        automaticallyAdjustContentInsets={false}
        contentInset={{bottom: 50}}
       />
      )
  },


});

Friends.propTypes = {
  friendsData: React.PropTypes.object.isRequired,
}


module.exports = Friends;

var React = require('react-native');
var Account = require('./account');
var Friends = require('./friends');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Icon = require('react-native-vector-icons/Ionicons');
var config = require('../config');
var shittyQs = require('shitty-qs');
var Challenges = require('./challenges');
var api = require('../Utils/api');
var Separator = require('./Helpers/Separator');

var {
  Text,
  View,
  NavigatorIOS,
  Image,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  TabBarIOS
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60
  },
  scrollView: {
    backgroundColor: '#6A85B1',
    height: 300,
  },
  image: {
    height: 350,
  },
  bg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: windowSize.width,
    height: windowSize.height
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  },
  tabBar: {
    backgroundColor: '#dfdfdf',
    flex: 1,
    color: '#ff0000',
    tintColor: '#877324'
},
instructions: {
  textAlign: 'left',
  color: '#333333',
  marginBottom: 5,
  fontSize: 18,
  marginTop: 5
},
rowContainer: {
  padding: 10
},
rowTitle: {
  color: '#69E3C8',
  fontSize: 16
},
rowContent: {
  fontSize: 16
},
image: {
  height: 125,
  width: 125,
  borderRadius: 65,
  marginTop: 10,
  alignSelf: 'center'
},
name: {
  alignSelf: 'center',
  fontSize: 21,
  marginTop: 10,
  marginBottom: 5,
  color: 'black'
},
handle: {
  alignSelf: 'center',
  fontSize: 16,
  color: 'black'
},
Scrollcontainer: {
  backgroundColor: '#F5F5F0',
  paddingBottom: 10,
  marginTop: 65
}
});

// var userInfo;
// var friendsInfo;
// var activity_step;

class Dashboard extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: ''
    };
  }

  componentDidMount(){
    var state = Math.random() + '';

    var friendsapidata;
    var badgesapidata;
    var activityInfogoals = [];
    var activityInfosummary = [];
    var goalsArr = [];

    api.fetchFriendsInfo(state,this.props.fitAccessToken)
      .then((res) => this.handleFriendssdata(res))

    api.fetchBadgesInfo(state, this.props.fitAccessToken)
      .then((jsonRes) => {
        this.setState ({
          badgesFitInfo: jsonRes
        });
      })

    api.fetchUserActivityStepsInfo(state,this.props.fitAccessToken)
      .then((jsonRes) => {
        this.setState ({
          activityInfogoals: jsonRes.goals,
          activityInfosummary: jsonRes.summary
        });
      })

    api.fetchUserInfo(state, this.props.fitAccessToken)
      .then((jsonRes) => {
        this.setState ({
          userFitProfile: jsonRes
        });
      })

    api.fetchInvitationInfo(state, this.props.fitAccessToken)
      .then((jsonRes) => {
        this.setState ({
          InvitationsFitInfo: jsonRes
        });
      })

  }

  handleActivitydata(res){
    var activityInfo = res;
    console.log("Activity Info: ", res);
    return activityInfo;
  }

  handleFriendssdata(res){
    var friendsInfo = res;
    console.log("Friends Info: ", res);
    return friendsInfo;
  }

  handleBadgesdata(res){
    var badgesapidata = res;
    console.log("Badges Info: ", res);
    return badgesapidata;
  }

  getRowTitle(arr, item){
    return this.capitalizeTitle(item);
  }

  getRowValue(item){
    return item;
  }

  capitalizeTitle(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  render(){
    var state = Math.random() + '';

    var fitbitInfo = this.props.userfitdata;
    var userActivitySteps;

    var goalsArr = this.props.userfitdata.goals;
    var summaryArr = this.props.userfitdata.summary;

    var goalsinfoArr = ['caloriesOut', 'steps', 'distance'];
    var summaryinfoArr = ['caloriesOut', 'steps', 'distances'];

    var goalslist = goalsinfoArr.map((item, index) => {
      if(!goalsArr[item]){
        return <View key={index}/>
      } else {
        return (
          <View key={index}>
            <View style={styles.rowContainer}>
              <Text style={styles.rowTitle}> {this.getRowTitle(goalsArr, item)} </Text>
              <Text style={styles.rowContent}> {goalsArr[item]} </Text>
            </View>
            <Separator />
          </View>
        )
      }
    });

    var summarylist = summaryinfoArr.map((item, index) => {
      if(!summaryArr[item]){
        return <View key={index}/>
      } else {
        return (
          <View key={index}>
            <View style={styles.rowContainer}>
              <Text style={styles.rowTitle}> {this.getRowTitle(summaryArr, item)} </Text>
              <Text style={styles.rowContent}> {this.getRowValue(summaryArr[item])} </Text>
            </View>
            <Separator />
          </View>
        )
      }

    });

    return (
      <TabBarIOS
        selectedTab={this.state.selectedTab}
        barTintColor='#FFF'
        titleTextColor='#c1d82f'
        tintColor='#69E3C8'

        styles={styles.tabBar}>

        <Icon.TabBarItem
          title="Dashboard"
          iconName="ios-home-outline"
          selectedIconName="ios-home"
          selected={this.state.selectedTab === 'dashboard'}
          onPress={() => {
            this.setState({
              selectedTab: 'dashboard',
            });
          }}>
          <ScrollView style={styles.container}>
            <Text style={styles.instructions}> Your Summary  </Text>
            <Separator />
            {summarylist}
            <Text style={styles.instructions}> Your Goals  </Text>
            <Separator />
            {goalslist}
          </ScrollView>
        </Icon.TabBarItem>

        <Icon.TabBarItem
          title="Challenges"
          iconName="ios-color-filter-outline"
          selectedIconName="ios-color-filter"
          selected={this.state.selectedTab === 'challenge'}
          onPress={() => {
            this.setState({
              selectedTab: 'challenge',
            });
          }}>
          <Challenges badgeData = { [this.state.badgesFitInfo, this.state.InvitationsFitInfo] } />
        </Icon.TabBarItem>

        <Icon.TabBarItem
          title="Friends"
          iconName="ios-people-outline"
          selectedIconName="ios-people"
          selected={this.state.selectedTab === 'friends'}
          onPress={() => {
            this.setState({
              selectedTab: 'friends',
            });
          }}>
          <Friends friendsData = { [this.props.fitAccessToken, this.props.friendsapidata] } />
        </Icon.TabBarItem>

        <Icon.TabBarItem
          title="Account"
          iconName="ios-cog-outline"
          selectedIconName="ios-cog"
          selected={this.state.selectedTab === 'account'}
          onPress={() => {
            this.setState({
              selectedTab: 'account',
            });
          }}>
          <Account accountInfo={[this.props.userInfo, this.state.userFitProfile]} />
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }
};


Dashboard.propTypes = {
  userInfo: React.PropTypes.object.isRequired,
  userfitdata: React.PropTypes.object.isRequired
}

module.exports = Dashboard;

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
    flex: 1
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
  marginTop: 65,
  textAlign: 'center',
  color: '#333333',
  marginBottom: 5,
},
rowContainer: {
  padding: 10
},
rowTitle: {
  color: '#69E3C8',
  fontSize: 16
},
rowContent: {
  fontSize: 19
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
    var activityInfo;

    api.fetchFriendsInfo(state,this.props.fitAccessToken)
      .then((res) => this.handleFriendssdata(res))

    api.fetchBadgesInfo(state, this.props.fitAccessToken)
      .then((res) => this.handleBadgesdata(res))

    api.fetchUserActivityStepsInfo(state,this.props.fitAccessToken)
      .then((jsonRes) => {
        console.log("Activity Response: ", jsonRes);

        this.setState ({
          activityInfo: jsonRes
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

  getRowTitle(user, item){
    return item;
  }

  render(){
    var state = Math.random() + '';

    var fitbitInfo = this.props.userfitdata;
    var userActivitySteps;

    var infoArr = ['strideLengthRunning', 'averageDailySteps'];

    console.log("hello badges:",this.badgesapidata);

    var list = infoArr.map((item, index) => {
      if(!fitbitInfo[item]){
        return <View key={index}/>
      } else {
        return (
          <View key={index}>
            <View style={styles.rowContainer}>
              <Text style={styles.rowTitle}> Amigo </Text>
              <Text style={styles.rowTitle}> {this.state.activityInfo} </Text>
              // <Text style={styles.rowTitle}>{this.getRowTitle(fitbitInfo, item)}</Text>
              // <Text style={styles.rowContent}> {fitbitInfo[item]} </Text>
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
            <Text style={styles.instructions}> Here buggy </Text>
            <Text style={styles.instructions}> {this.state.activityInfo} </Text>
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
          <View style={styles.container}>
            <Text> Welcome to Challengers </Text>
            <Challenges badgeData = { this.props.badgesapidata } />
          </View>
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
          <Account accountInfo={[this.props.userInfo, this.props.userfitdata]} />
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

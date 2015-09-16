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

var userInfo;
var friendsInfo;

class Dashboard extends React.Component{

  constructor(props) {
    super(props);

    console.log("props in constructor", this.props.userInfo.sessionToken);

    console.log("User data", this.props.userfitdata);

    this.state = {
      selectedTab: '',
      friendsapidata: '',
      badgesapidata: ''
    };
  }

  componentDidMount(){
    var state = Math.random() + '';
    var friendsapidata;
    var badgesapidata;

    console.log("Access token in friends:", this.props.fitAccessToken);
    fetch(
      'https://api.fitbit.com/1/user/-/friends.json',
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${state && this.props.fitAccessToken}`
        }
      }
    ).then((res) => res.json())
    .then((res) => {
      this.state({
        friendsapidata: this.res
      })
      console.log("This friends from dashboard:"+this.friendsapidata);
    })

    fetch(
      'https://api.fitbit.com/1/user/-/badges.json',
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${state && this.props.fitAccessToken}`
        }
      }
    ).then((res) => res.json())
    .then((res) => {
      this.state({
        badgesapidata: this.res
      })
      console.log("This badges from dashboard:"+this.badgesapidata);
    })

    console.log("Here 123");

  }

  handleLoginResponse(loginResponse){
    var currentUser = loginResponse;
    console.log("Current User", currentUser);
  }

  getFriendsInfo(){

    console.log("Just here:"+this.props.fitAccessToken);

    var state = Math.random() + '';

    return fetch(
      'https://api.fitbit.com/1/user/-/friends.json',
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${state && this.props.fitAccessToken}`
        }
      }
    ).then((res) => res.json()).then((res) => this.handleFriendsdata(res).done())
  }

  handleActivitydata(res){
    var activityInfo = res;
    return res;
  }

  getRowTitle(user, item){
    return item;
  }

  getActivityInfo(){
    console.log("Just here:"+this.props.fitAccessToken);

    var state = Math.random() + '';

    return fetch(
      'https://api.fitbit.com/1/user/-/activities/date/today/1d.json',
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${state && this.props.fitAccessToken}`
        }
      }
    ).then((res) => res.json()).then((res) => handleActivitydata(res).done())
  }

  render(){
    var state = Math.random() + ''
    var fitbitInfo = this.props.userfitdata.user;

    console.log("hello here:",fitbitInfo);
    console.log("This activity from dashboard:", this.getActivityInfo().call);

    var infoArr = ['strideLengthRunning', 'averageDailySteps'];

    var list = infoArr.map((item, index) => {
      if(!fitbitInfo[item]){
        return <View key={index}/>
      } else {
        return (
          <View key={index}>
            <View style={styles.rowContainer}>
              <Text style={styles.rowTitle}>{this.getRowTitle(fitbitInfo, item)}</Text>
              <Text style={styles.rowContent}> {fitbitInfo[item]} </Text>
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

          <ScrollView style={styles.Scrollcontainer}>
            {list}
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

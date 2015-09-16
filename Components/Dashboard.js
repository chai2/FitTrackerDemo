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
    marginTop: 65,
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
    return fetch(
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

    return fetch(
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
      console.log("This friends from dashboard:"+this.badgesapidata);
    })

    // https://api.fitbit.com/1/user/[user-id]/badges.json

    // api.setCurrentUser(this.props.userInfo.sessionToken)
    // .then((jsonRes) => this.handleLoginResponse(jsonRes))
    // .catch((err) => {
    //   this.setState({
    //     isLoading: false,
    //     error: `There was an error: ${err}`
    //   })
    // })

    // return fetch(
    //   'https://api.parse.com/1/users/me',
    //   {
    //     method: 'GET',
    //     headers: {
    //       'X-Parse-Application-Id': 'Wyf2z9CIprx4iRDm7GCnCXbH7hlWkCr44aLkP7De',
    //       'X-Parse-REST-API-Key': 'lYO6X3o9inU3TmmyHCtzDE8SzP5JP89S5MsGZqJZ',
    //       'X-Parse-Session-Token': `${access_token}`
    //     }
    // })

    console.log("Here 123");

  }

  handleLoginResponse(loginResponse){
    var currentUser = loginResponse;
    console.log("Current User", currentUser);
  }

  // getFriendsInfo(){
  //
  //   console.log("Just here:"+this.props.fitAccessToken);
  //
  //   var state = Math.random() + '';
  //
  //   return fetch(
  //     'https://api.fitbit.com/1/user/-/friends.json',
  //     {
  //       method: 'GET',
  //       headers: {
  //         'Authorization': `Bearer ${state && this.props.fitAccessToken}`
  //       }
  //     }
  //   ).then((res) => res.json()).then((res) => this.handleFriendsdata(res).done())
  // }
  //
  // handleFriendsdata(res){
  //   return res;
  // }

  render(){
    var state = Math.random() + ''

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
          <Text style={styles.instructions}>
            My Activity {this.props.userfitdata.user.strideLengthRunning + '\n\n'}
            Average Steps Taken {this.props.userfitdata.user.averageDailySteps + '\n\n'}
            My Goals to Reach:
          </Text>
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

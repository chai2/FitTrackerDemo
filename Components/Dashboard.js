var React = require('react-native');
var Account = require('./account');
var Friends = require('./friends');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Icon = require('react-native-vector-icons/Ionicons');
var config = require('../config');
var shittyQs = require('shitty-qs');

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
  textAlign: 'center',
  color: '#333333',
  marginBottom: 5,
}
});

var userInfo;
var friendsInfo;

class Dashboard extends React.Component{

  // getDefaultProps(){
  //   return{
  //     userdata: this.props
  //   };
  //
  //   console.log("Prop values", this.props);
  //
  // }
  //
  // getInitialState(){
  //   return{
  //     value: "hello"
  //   };
  //   console.log("initialRoute");
  // }


  constructor(props) {
    super(props);

    console.log("props in constructor");

    this.state = {
      selectedTab: ''
    };
  }
  //
  // componentDidMount () {
  //   var state = Math.random() + ''
  //
  //   fitbitOauth(config.fitbit_app_key, (err, access_token) => {
  //     if (err) {
  //       console.log(err)
  //     }
  //     this.setState({
  //       access_token: access_token
  //     })
  //
  //     fetch(
  //       'https://api.fitbit.com/1/user/-/friends.json',
  //       {
  //         method: 'GET',
  //         headers: {
  //           'Authorization': `Bearer ${state && access_token}`
  //         }
  //       }
  //     ).then((res) => res.json()).then((res) => this.getFriendsInfo(res))
  //
  //     fetch(
  //       'https://api.fitbit.com/1/user/-/profile.json',
  //       {
  //         method: 'GET',
  //         headers: {
  //           'Authorization': `Bearer ${state && access_token}`
  //         }
  //       }
  //     ).then((res) => res.json()).then((res) => this.getUserInfo(res))
  //   })
  // }
  //
  // getUserInfo(res){
  //   userdata = res;
  //   return userdata;
  // }
  //
  // getFriendsInfo(res){
  //   friendsInfo = res;
  //   return friendsInfo;
  // }

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

  handleFriendsdata(res){
    return res;
  }

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
            Welcome to dashboard  Toekn: {this.props.fitAccessToken} {this.props.userfitdata}
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
            {}
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
          <Friends friendsData = { this.getFriendsInfo() }
          />
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
          <Account userInfo={this.props.userInfo, this.props.userfitdata} />
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

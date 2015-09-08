var React = require('react-native');
var Account = require('./account');
var Friends = require('./friends');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

Parse.initialize('Wyf2z9CIprx4iRDm7GCnCXbH7hlWkCr44aLkP7De','56ejFKXCGa01h0eYnaPXteYmbfJKDzNPHowdQbgW');


var {
  Text,
  View,
  NavigatorIOS,
  Image,
  StyleSheet,
  TouchableHighlight,
  TabBarIOS
} = React;

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
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
}
});

class Dashboard extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: ''
    };
  }

  makeBackground(btn){
    var obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
    }
    if(btn === 0){
      obj.backgroundColor = '#48BBEC';
    } else if (btn === 1){
      obj.backgroundColor = '#E77AAE';
    } else {
      obj.backgroundColor = '#758BF4';
    }
    return obj;
  }
  render(){

    console.log("Dashboard Navigate:", this.props.navigate);

    return (

      <TabBarIOS
        selectedTab={this.state.selectedTab}
        tintColor={'#c1d82f'}
        barTintColor={'#000000'}
        styles={styles.tabBar}>
        <TabBarIOS.Item
          name="home"
          title={'dashboard'}
          selected={this.state.selectedTab === 'dashboard'}
          iconName={'ion|ios-home-outline'}
          iconSize={32}
          onPress={() => {
              this.setState({
                  selectedTab: 'dashboard'
              });
          }}>
          <View style={styles.container}>
            <Image style={styles.bg} source={{uri: 'http://i.imgur.com/xlQ56UK.jpg'}} />
            <Text> Welcome to dashboard </Text>
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          name="friends"
          title={'friends'}
          selected={this.state.selectedTab === 'friend'}
          iconName={'ion|ios-home-outline'}
          // icon={{uri:'http://i.imgur.com/iVVVMRX.png'}}
          onPress={() => {
                this.setState({
                    selectedTab: 'friend',
                });
          }}>
          <Friends navigate={this.props.navigate}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          name="account"
          title={'account'}
          selected={this.state.selectedTab === 'account'}
          iconName={'ion|ios-home-outline'}

          // icon={{uri:'http://i.imgur.com/iVVVMRX.png'}}
          onPress={() => {
                this.setState({
                    selectedTab: 'account',
                });
          }}>
          <Account navigate={this.props.navigate}/>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
};

// Dashboard.propTypes = {
//   userInfo: React.PropTypes.object.isRequired
// }

module.exports = Dashboard;

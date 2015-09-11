'use strict';

var React = require('react-native');
var CollectionCell = require('./leaderboard');
var SingleCollection = require('./friends');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var {
 View,
 ListView,
 Image,
 SegmentedControlIOS,
 StyleSheet,
 Text
} = React;


var styles = StyleSheet.create({
  container: {
    marginTop: 64,
    flex: 1,
  },
  image: {
    height: 75,
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

class Account extends React.Component{

  constructor(props) {
    super(props);
    console.log(this.props.accountInfo[0]);
  }

  componentDidMount() {
    console.log("I'm in account")
    console.log(this.props.accountInfo[0].email);
  }

  render() {
    return (
        <View style={styles.container}>
          <Text> Username: {this.props.accountInfo[0].username} </Text>
          <Text> Email: {this.props.accountInfo[0].email} </Text>
          <Text> Password: </Text>

        </View>
    );
  }
};


Account.propTypes = {
  accountInfo: React.PropTypes.object.isRequired
}

module.exports = Account;

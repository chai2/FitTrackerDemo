'use strict';

var React = require('react-native');
var CollectionCell = require('./leaderboard');
var SingleCollection = require('./friends');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Separator = require('./Helpers/Separator');

var {
 View,
 ListView,
 Image,
 SegmentedControlIOS,
 StyleSheet,
 Text,
 ScrollView
} = React;


var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: windowSize.width,
    height: windowSize.height
  },
  tabBar: {
    backgroundColor: '#dfdfdf',
    flex: 1,
    color: '#ff0000',
    tintColor: '#877324'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
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
    paddingBottom: 10
  }
});

class Account extends React.Component{

  getRowTitle(user, item){
    return item;
  }

  render() {
    var userInfo = this.props.accountInfo[0];
    var infoArr = ['username', 'email'];

    var list = infoArr.map((item, index) => {
      if(!userInfo[item]){
        return <View key={index}/>
      } else {
        return (
          <View key={index}>
            <View style={styles.rowContainer}>
              <Text style={styles.rowTitle}>{this.getRowTitle(userInfo, item)}</Text>
              <Text style={styles.rowContent}> {userInfo[item]} </Text>
            </View>
            <Separator />
          </View>
        )
      }
    });

    return (
      <ScrollView style={styles.Scrollcontainer}>
        <Image style={styles.image} source={{uri: this.props.accountInfo[1].user.avatar150}}/>
        <Text style={styles.name}> {this.props.accountInfo[1].user.displayName} </Text>
        <Text style={styles.handle}> {this.props.accountInfo[1].user.nickname} </Text>
        {list}
      </ScrollView>
    )

  }
};


Account.propTypes = {
  accountInfo: React.PropTypes.object.isRequired
}

module.exports = Account;

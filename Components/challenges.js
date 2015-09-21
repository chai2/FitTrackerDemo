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
 ScrollView,
 Text
} = React;


var styles = StyleSheet.create({
  container: {
    marginTop: 64,
    flex: 1,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 15,
    marginTop: 10,
    alignSelf: 'flex-start'
  },
  bg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: windowSize.width,
    height: windowSize.height
  },
  badgename: {
    alignSelf: 'auto',
    fontSize: 16,
    color: 'black'
  },
  badgedescription: {
    alignSelf: 'auto',
    fontSize: 16,
    color: 'black'
  },
  timesacheived: {
    alignSelf: 'auto',
    fontSize: 16,
    color: 'black'
  },

  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  },
  Scrollcontainer: {
    paddingBottom: 10
  },
  tabBar: {
  backgroundColor: '#dfdfdf',
  flex: 1,
  color: '#ff0000',
  tintColor: '#877324'
}
});

class Challenges extends React.Component{

  // componentDidMount() {
  //   console.log("I'm in challenges");
  //   console.log("First", this.props.badgeData[0]);
  //   console.log("Second", this.props.badgeData[1]);
  //
  //   console.log("Here 123");
  //
  // }

  getRowTitle(badge, item){
    console.log("Items", item);
    return item;
  }

  render() {

    var badgesInfo = this.props.badgeData[0].badges;
    var infoArr = ['image50px', 'description', 'name'];

    var InvitationsInfo = this.props.badgeData[1].friends;

    console.log("Invitaions Info", InvitationsInfo);

    var list = [];

    for(var item in badgesInfo)
    {
      list.push(

          <View style={styles.rowContainer}>
            <Image style={styles.image} source={{uri: badgesInfo[item].image50px}}/>
            <Text style={styles.badgedescription}>Description: {badgesInfo[item].description}</Text>
            <Text style={styles.badgename}>Name: {badgesInfo[item].name} </Text>
            <Text style={styles.timesacheived}>Times Achieved: {badgesInfo[item].timesAchieved} </Text>
            <Separator />
          </View>
      )
    }

    return (
      <ScrollView style={styles.Scrollcontainer}>
        <Text style={styles.badgename}> Your Badges </Text>
        <Separator />
        {list}
        <Text style={styles.badgename}> Your Invitations </Text>
        <Separator />
        <Text style={styles.badgename}> No Invitations Yet</Text>
      </ScrollView>
    );
  }
};

Challenges.propTypes = {
  badgeData: React.PropTypes.object.isRequired
}

module.exports = Challenges;

'use strict';

var React = require('react-native');
var CollectionCell = require('./leaderboard');
var SingleCollection = require('./friends');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var {
 View,
 ListView,
 SegmentedControlIOS,
 StyleSheet
} = React;


var styles = StyleSheet.create({
  container: {
    marginTop: 64,
    flex: 1,
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

var Account = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'Leaderboard',
      loaded: false
    }
  },

  componentDidMount: function() {
    console.log("I'm in account")
  },

  render: function() {

      return (
          <View style={styles.container}>
            <SegmentedControlIOS
              values={['Leaderboard', 'All Friends']}
              selectedIndex={0}
              tintColor={'#69E3C8'}
              onValueChange={(val) => {
                this.setState({
                  selectedTab: val
                })
              }} />
          </View>
        )
  },

  renderLoading: function() {
    return (
      <View style={styles.container}>
      </View>
      )
  },

  renderListView: function() {
    if (this.state.selectedTab === 'Leaderboard') {
      return (
        <View style={styles.container}>
          {this.renderFeaturedCollectionsListView()}
        </View>
        )
    } else if (this.state.selectedTab === 'All') {
      return (
          this.renderAllCollectionsListView()
        )
    }
  },

  renderFeaturedCollectionsListView: function() {
    return (
      <Text> This is from Featured List view </Text>
        )
  },

  renderAllCollectionsListView: function() {
    return (
      <Text> This is from All List view </Text>
      )
  },

  renderCollectionCell: function(collection) {
    return (
      <CollectionCell
        onSelect={() => this.selectCollection(collection)}
        collection={collection} />
      )
  },

  selectCollection: function(collection) {
    this.props.navigator.push({
      title: collection.name,
      component: SingleCollection,
      backButtonTitle: ' '
    })
  }
})


module.exports = Account;

var React = require('react-native');
var Dashboard = require('./Dashboard');
var Signin = require('./Signin');

var {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  NavigatorIOS
} = React;

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  }
});

class Main extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      username: '',
      isLoading: false,
      error: false
    }
  }
  handleChange(e){
    this.setState({
      username: e.nativeEvent.text
    })
  }
  handleResponse(res){
    if(res.message === 'Not Found'){
      this.setState({
        error: 'User not found',
        isLoading: false
      })
    } else {
      this.props.navigator.push({
        title: res.name || 'Select an Option',
        component: Dashboard,
        passProps: {userInfo: res}
      });
      this.setState({
        isLoading: false,
        error: false,
        username: ''
      });
    }
  }
  handleSubmit(){
    this.setState({
      isLoading: true,
    });
    api.getBio(this.state.username)
      .then((jsonRes) => this.handleResponse(jsonRes))
      .catch((err) => {
        this.setState({
          isLoading: false,
          error: `There was an error: ${err}`
        })
      })
  }

  render() {

  var requiredScreen;

  var currentUser;

  if(currentUser){
    console.log("In Main here");
    requiredScreen = <Dashboard navigate={this.props.navigator}/>;
  } else {
    console.log("Without Main here");
    requiredScreen = <Dashboard navigate={this.props.navigator} />;
  };

  return(
    <View style={styles.mainContainer}>
      {requiredScreen}
    </View>
  );
  }
};

module.exports = Main;

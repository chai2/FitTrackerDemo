var React = require('react-native');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');
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
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

class Main extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      username: '',
      isLoading: false,
      error: false
    }
    console.log("In Main in constr" + this.props.navigator);
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

  var currentUser = Parse.User.current();

  console.log("I'm in Main", currentUser);

  if(currentUser){
    console.log("In Main here");
    console.log(Parse.User.current());
    requiredScreen = <Dashboard navigate={this.props.navigator}/>;
  } else {
    console.log("Without Main here");
    requiredScreen = <Signin navigate={this.props.navigator} />;
  };

  return(
    <View style={styles.mainContainer}>
      {requiredScreen}
          <Text> Cool ya? </Text>
    </View>
  );
  }
};

module.exports = Main;

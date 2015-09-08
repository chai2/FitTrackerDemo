var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Signup = require('./Signup');
var Router = require('react-native-router');
var api = require('../Utils/api');

var Parse = require('parse').Parse;

Parse.initialize(
  'Wyf2z9CIprx4iRDm7GCnCXbH7hlWkCr44aLkP7De',
  '56ejFKXCGa01h0eYnaPXteYmbfJKDzNPHowdQbgW'
);

var {
  Text,
  View,
  NavigatorIOS,
  Image,
  StyleSheet,
  TextInput,
  TouchableHighlight
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  forgotContainer: {
    alignItems: 'flex-end',
    padding: 15,
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
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
});

class Signin extends React.Component{
  constructor(props){
    super(props)
    console.log("In Sign in constr" + this.props.navigate);

    this.state = {
      username: '',
      password: '',
      email: '',
      isUser: false
    }
  }

  handleUsernameChange(e){
    this.setState({
      username: e.nativeEvent.text
    })
  }

  handlePasswordChange(e){
    this.setState({
      password: e.nativeEvent.text
    })
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
  navigatetoSignup(e){
    console.log("navigating to login"+this.props.navigate);
    this.props.navigate.push({
      title: 'Sign Up',
      component: Signup
    })
  }

  handleResponse(res){

  var dat = res;
  var currentUser = Parse.User.current();
  var Dashboard = require('./Dashboard');

  console.log("Current User:" + currentUser +"Response: " + res);

  console.log("Are you true?: "+ currentUser._isCurrentUser);

  // console.log('in handleResponse of sign in'+ this.state.isUser + "data", dat.code);

  if(!currentUser._isCurrentUser){
    this.setState({
      error: 'User not found',
      isLoading: false
    })

  } else {
    console.log("False Positive");
    console.log("In Here: ", currentUser);

    console.log("Navigate:"+this.props.navigate);

    this.props.navigate.push({
      title: 'Dashboard',
      component: Dashboard,
      passProps: {navigate: this.props.navigate}      
    });
    this.setState({
      isLoading: false,
      error: false,
      username: ''
    });
    }
  }

  handleSubmit(e){

    console.log("In submit"+this.state.username+"pass:"+this.state.password);

    var currentUser = Parse.User.current();

    return (Parse.User.logIn(this.state.username, this.state.password, {
      success: function(user) {
        console.log("I'm authing you");
        // Do stuff after successful login.
        currentUser = Parse.User.current();

        return currentUser;
      },
      error: function(user, error) {
        console.log("I'm erroring you");
        // The login failed. Check error to see why.
      }
    })
  ).then((jsonRes) => this.handleResponse(jsonRes));

    // console.log("Current user data:"+currentUser);
    //
    // if(currentUser != null){
    //     this.handleResponse.bind(this);
    //   console.log("I am correct login");
    // } else {
    //   console.log("see you dude.");
    // }

    // api.performAuth(this.state.username, this.state.password)
    //   .then((jsonRes) => this.handleResponse(jsonRes))
    //   .catch((err) => {
    //     console.log("failed"+err);
    //     this.setState({
    //       isUser: false
    //     })
    //   })

    // var url = `https://api.parse.com/1/login?username=`+this.state.username+`&password=`+this.state.password;
    // return fetch(url, {
    //   method: 'get',
    //   headers: {
    //   'X-Parse-Application-Id': 'Wyf2z9CIprx4iRDm7GCnCXbH7hlWkCr44aLkP7De',
    //   'X-Parse-REST-API-Key': 'lYO6X3o9inU3TmmyHCtzDE8SzP5JP89S5MsGZqJZ'
    //   }
    // }).then((res) => res.handleResponse());
    // .then((jsonRes) => this.handleResponse(jsonRes))
    //
    // console.log("Response" + res);

    // Parse.User.logIn(this.state.username, this.state.password, {
    //   success: function(user) {
    //     console.log("correct login");
    //     // Do stuff after successful login.
    //     console.log(user);
    //     this.state.isUser = true;
    //     return user;
    //   },
    //   error: function(user, error) {
    //     console.log("falthu login");
    //     return error;
    //     // The login failed. Check error to see why.
    //   }
    // })
  }

  render(){
    return (
      <View style={styles.container}>
        <Image style={styles.bg} source={{uri: 'http://i.imgur.com/f9ius9d.jpg'}} />
        <View style={styles.forgotContainer}>
          <Text style={styles.instructions}> Hello Signin</Text>
        </View>
        <TextInput
          style={styles.searchInput}
          value={this.state.username}
          onChange={this.handleUsernameChange.bind(this)} />
        <TextInput
          style={styles.searchInput}
          value={this.state.password}
          onChange={this.handlePasswordChange.bind(this)} />

          <TouchableHighlight
            style={styles.button}
            onPress={this.handleSubmit.bind(this)}
            underlayColor="white">
              <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableHighlight>

        <TouchableHighlight
          style={styles.signup}
          onPress={this.navigatetoSignup.bind(this)}>
            <Text style={styles.greyFont}>
              Already a user?<Text style={styles.whiteFont}>Signup</Text>
            </Text>
        </TouchableHighlight>
      </View>
    )
  }
};

// Dashboard.propTypes = {
//   userInfo: React.PropTypes.object.isRequired
// }

module.exports = Signin;

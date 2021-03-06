var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Signup = require('./Signup');
var api = require('../Utils/api');
var oauth = require('../Utils/fitbitOauth');
var config = require('../config');
var shittyQs = require('shitty-qs');

var {
  Text,
  View,
  NavigatorIOS,
  Image,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  LinkingIOS,
  ActivityIndicatorIOS
} = React;

var styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      marginTop: 63,
      backgroundColor: 'transparent'
    },
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .5,
        backgroundColor: 'transparent'
    },
    mark: {
        width: 150,
        height: 150
    },
    signin: {
        backgroundColor: '#69E3C8',
        padding: 20,
        alignItems: 'center'
    },
    signup: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: .15
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        flex: .25
    },
    inputPassword: {
        marginLeft: 15,
        width: 20,
        height: 21
    },
    inputUsername: {
      marginLeft: 15,
      width: 20,
      height: 20
    },
    inputContainer: {
        padding: 10,
        borderWidth: 1,
        borderBottomColor: '#CCC',
        borderColor: 'transparent'
    },
    input: {
        position: 'absolute',
        left: 61,
        top: 12,
        right: 0,
        height: 20,
        fontSize: 14
    },
    forgotContainer: {
      alignItems: 'flex-end',
      padding: 15,
    },
    greyFont: {
      color: '#D8D8D8'
    },
    whiteFont: {
      color: '#FFF'
    }
});

var userfitdata;
var friendsInfo;

class Signin extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      username: '',
      password: '',
      email: '',
      isLoading: false,
      error: false,
      isUser: false
    }
  }

  hideNavBar(){
    this.setState({hideNavBar: true});
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

  navigatetoSignup(e){
    this.props.navigate.push({
      title: 'Sign Up',
      component: Signup,
      passProps: { navigate: this.props.navigate }
    })
  }

  handleResponse(user_login_info){
  var loginData = user_login_info;

  var state = Math.random() + '';

  console.log("login data response", loginData);

  if (loginData.error){
    this.setState({
      isLoading: false,
      error: `Error: ${loginData.error}`
    })
  } else {

    oauth.fitbitOauth(config.fitbit_app_key, (err, access_token) => {
      if (err) {
        console.log(err)
      }
      this.setState({
        access_token: access_token
      })

      console.log("Fit Token:" + access_token);

      var today = new Date();

      var date = today.toISOString().substring(0, 10);
      var url = 'https://api.fitbit.com/1/user/-/activities/date/'+date+'.json'

      return fetch(
        url,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${state && access_token}`
          }
        }
      ).then((res) => res.json()).then((res) => {
        var Dashboard = require('./Dashboard');
        this.props.navigate.push({
          navigationBarHidden: this.props.hideNavBar,
          title: 'Dashboard',
          component: Dashboard,
          passProps: {userInfo: loginData, userfitdata: res, fitAccessToken: access_token }
        })
      })
    })
  }
  }

  handleSubmit(e){

    api.performAuth(this.state.username, this.state.password)
    .then((jsonRes) => this.handleResponse(jsonRes))
    .catch((err) => {
      this.setState({
        isLoading: false,
        error: `There was an error: ${err}`
      })
    })
  }

  render(){
    var showErr = (
      this.state.error ? <Text> {this.state.error} </Text> : <View></View>
    );
    return (
      <View style={styles.container}>
        <Image style={styles.bg} source={{uri: 'http://i.imgur.com/xlQ56UK.jpg'}} />
        <View style={styles.header}>
            <Image style={styles.mark} source={{uri: 'http://i.imgur.com/da4G0Io.png'}} />
        </View>
          {showErr}
        <View style={styles.inputs}>
            <View style={styles.inputContainer}>
                <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
                <TextInput
                    style={[styles.input, styles.whiteFont]}
                    placeholder="Username"
                    placeholderTextColor="#FFF"
                    onChange={this.handleUsernameChange.bind(this)}
                    value={this.state.username}
                />
            </View>
            <View style={styles.inputContainer}>
                <Image style={styles.inputPassword} source={{uri: 'http://i.imgur.com/ON58SIG.png'}}/>
                <TextInput
                    password={true}
                    style={[styles.input, styles.whiteFont]}
                    placeholder="Pasword"
                    placeholderTextColor="#FFF"
                    onChange={this.handlePasswordChange.bind(this)}
                    value={this.state.password}
                />
            </View>
        </View>

        <TouchableHighlight
          style={styles.signin}
          onPress={this.handleSubmit.bind(this)}
          underlayColor = "white">
            <Text style={styles.whiteFont}>Sign In</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={styles.signup}
            onPress={this.navigatetoSignup.bind(this)} >
            <Text style={styles.greyFont}>Dont have an account?<Text style={styles.whiteFont}>  Sign Up</Text></Text>
        </TouchableHighlight>

      </View>
    )
  }
};

module.exports = Signin;

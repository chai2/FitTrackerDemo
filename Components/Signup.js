'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Login = require('./Signin');
var api = require('../Utils/api');
var oauth = require('../Utils/fitbitOauth');
var config = require('../config');

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight
} = React;

class Signup extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      email: '',
      error: false
    }
  }
  getUsername(e){
      this.setState({
        username: e.nativeEvent.text
      })
  }
  getPassword(e){
    this.setState({
      password: e.nativeEvent.text
    })
  }
  getEmail(e){
    this.setState({
      email: e.nativeEvent.text
    })
  }

  handleResponse(response){
  var signupData = response;

  var state = Math.random() + '';

  if (signupData.error){
    this.setState({
      isLoading: false,
      error: `Error: ${signupData.error}`
    })
  } else {
    console.log("config.fitbit_app_key", config.fitbit_app_key);
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
        console.log("Response in fit: ", res);
        var Signin = require('./Signin');
        this.props.navigate.push({
          title: 'Sign In',
          component: Signin,
        })
      })
    })
  }
  }

  handleSubmit(e){

    var url = `https://api.parse.com/1/users`;

    return fetch(url, {
      method: 'POST',
      headers: {
        'X-Parse-Application-Id': 'Wyf2z9CIprx4iRDm7GCnCXbH7hlWkCr44aLkP7De',
        'X-Parse-REST-API-Key': 'lYO6X3o9inU3TmmyHCtzDE8SzP5JP89S5MsGZqJZ'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      })
    }).then((res) => res.json())
      .then((res) => this.handleResponse(res))
      .catch((err) => {
        this.setState({
          isLoading: false,
          error: `There was an error: ${err}`
        })
      })

    // api.performSignup(this.state.username, this.state.password, this.state.email)
    // .then((jsonRes) => this.handleResponse(jsonRes))
    // .catch((err) => {
    //   this.setState({
    //     isLoading: false,
    //     error: `There was an error: ${err}`
    //   })
    // })
  }

  navigatetoLogin(e){
    this.props.navigate.pop();
  }

  render() {
    return (
        <View style={styles.container}>
          <Text> What </Text>
            <Image style={styles.bg} source={{uri: 'http://i.imgur.com/xlQ56UK.jpg'}} />
            <View style={styles.header}>
                <Image style={styles.mark} source={{uri: 'http://i.imgur.com/da4G0Io.png'}} />
            </View>
            <View style={styles.inputs}>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
                    <TextInput
                        style={[styles.input, styles.whiteFont]}
                        placeholder="Username"
                        placeholderTextColor="#FFF"
                        onChange={this.getUsername.bind(this)}
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
                        onChange={this.getPassword.bind(this)}
                        value={this.state.password}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputEmail} source={{uri: 'http://technology.gsu.edu/files/2013/04/email_icon_80x80.png'}}/>

                    <TextInput
                        style={[styles.input, styles.whiteFont]}
                        placeholder="Email"
                        placeholderTextColor="#FFF"
                        onChange={this.getEmail.bind(this)}
                        value={this.state.email}
                    />
                </View>
            </View>
            <TouchableHighlight
              style={styles.signin}
              onPress={this.handleSubmit.bind(this)}
              underlayColor = "white">
                <Text style={styles.whiteFont}>Sign Up</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.signup}
              onPress={this.navigatetoLogin.bind(this)}>
                <Text style={styles.greyFont}>
                  Already a user?<Text style={styles.whiteFont}> Sign In </Text>
                </Text>
            </TouchableHighlight>
        </View>
    );
  }
};

var styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'transparent'
    },
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height
    },
    error: {
      color: '#FF3366',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5
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
    inputEmail: {
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
})


module.exports = Signup;

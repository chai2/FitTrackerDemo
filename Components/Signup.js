'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var api = require('../Utils/api');
var Login = require('./Signin');

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
  handleResponse(res){
    console.log(res);
    console.log(res.includes('createdAt'));
    if(res.code === 125){
      this.setState({
        error: "Enter Valid Email",
        email: ''
      })
    } else if (res.code === 201){
      console.log("sign success");
      var Dashboard = require('../dashboard/dashboard');
      this.props.navigator.push({
        title: 'Dashboard',
        component: Dashboard,
        passProps: {userInfo: res}
      })
    } else {
      console.log("Error creating a new user");
    }
  }

  signUp(e){

    var username = this.state.username;
    var password = this.state.password;
    var email    = this.state.email;

    api.newSignup(username, password, email)
      .then((jsonRes) => this.handleResponse(jsonRes))
  }

  navigatetoLogin(e){
    console.log("navigating to login");
    this.props.navigator.push({
      title: 'Login',
      component: Login
    })
  }

  render() {
    var showErr = (
      this.state.error ? <Text style={styles.error}> {this.state.error} </Text> : <View></View>
    );
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
                    {showErr}

                    <TextInput
                        style={[styles.input, styles.whiteFont]}
                        placeholder="Email"
                        placeholderTextColor="#FFF"
                        onChange={this.getEmail.bind(this)}
                        value={this.state.email}
                    />
                </View>
                <View style={styles.forgotContainer}>
                    <Text style={styles.greyFont}>Forgot Password</Text>
                </View>
            </View>
            <TouchableHighlight
              style={styles.signin}
              onPress={this.signUp.bind(this)}
              underlayColor = "white">
                <Text style={styles.whiteFont}>Sign Up</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.signup}
              onPress={this.navigatetoLogin.bind(this)}>
                <Text style={styles.greyFont}>
                  Already a user?<Text style={styles.whiteFont}>Login</Text>
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
        backgroundColor: '#FF3366',
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

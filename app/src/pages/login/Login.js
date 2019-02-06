import React from 'react';
import { Text, FormInput, FormLabel, Button } from 'react-native-elements';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './LoginStyle';

import {WLClient} from 'react-native-ibm-mobilefirst';
import {WLAuthorizationManager} from 'react-native-ibm-mobilefirst';
import {WLLogger} from 'react-native-ibm-mobilefirst';

const backgroundImage = require('../../../assets/images/login.png');

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.submitCreds = this.submitCreds.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.state={
      username:'vittal',
      password:'vittal'
    };
    var logger =new WLLogger("mytag");
    logger.setCapture(true); 
    logger.setLevel("DEBUG");
    logger.debug("This is a log message for mytag");
    var userLoginCH = new UserLoginCH(); 
    WLClient.registerChallengeHandler(userLoginCH ,"UserLogin") ; 
  }

  onUsernameChange(value){
    this.setState({
      username:value
    });
  }

  onPasswordChange(value){
    this.setState({
      password:value
    });
  }

  submitCreds() {
    var mylogger = new WLLogger("LoginPage");
    mylogger.setCapture(true);
    mylogger.setLevel(WLLogger.TRACE);
    mylogger.trace("Login page opened "); 

    mylogger.send();
    var creds = { "username" : this.state.username , 
          "password" : this.state.password
        };

    WLAuthorizationManager.login("UserLogin", creds).then((response)=>{
        console.log('login success');
        mylogger.debug("Logged in successfully ");
        this.props.updateLoginStatus(true);
    },(error)=>{
      mylogger.debug('error in login  page'+ JSON.stringify(error));
      console.log('error in login  page'+ JSON.stringify(error));
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.backgroundImg}
          source={backgroundImage}
        />
        <View>
          <Text style={styles.appName}>Wallet</Text>
          <Text style={styles.loginText}>Login</Text>
          <View style={styles.loginBox}>
            <View style={styles.usernameWrapper}>
              <FormLabel labelStyle={styles.label}>USERNAME</FormLabel>
              <View style={{borderColor: "gray", borderWidth:1, borderRadius:10}}>
                <FormInput onChangeText={this.onUsernameChange} inputStyle={styles.username} />
              </View>
            </View>
            <View style={styles.passwordWrapper}>
              <FormLabel labelStyle={styles.label}>PASSWORD</FormLabel>
              <View style={{borderColor: "gray", borderWidth:1, borderRadius:10}}>
                <FormInput onChangeText={this.onPasswordChange} inputStyle={styles.password} secureTextEntry={true}/>
              </View>
            </View>
          </View>
        </View>

        <View style={{height: 40, width: '100%', alignItems:'center'}}>
          <View style={{width: '50%'}}>
            <Button
              title="Login"
              backgroundColor="#8863fa"
              color="white"
              borderRadius= {10}
              onPress={this.submitCreds}
            />
          </View>
        </View>
      </View>
    );
  }
}

Login.defaultProps = {
  updateLoginStatus: () => {},
};

Login.propTypes = {
  updateLoginStatus: PropTypes.func,
};

class UserLoginCH { 
  constructor() {
  }
  handleChallenge(params){
    console.log("Got challenge " + JSON.stringify(params));
    var answer = {"username" : this.state.username , 
        "password" : this.state.password};
    WLClient.submitChallengeAnswer("UserLogin", answer);
  }
  handleSuccess(){
    console.log("Inside handle success");
  }
  handleFailure(){
    console.log("Inside handle failure");
  }
}
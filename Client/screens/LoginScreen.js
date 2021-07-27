import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import NavigationButton from '../components/NavigationButton';

import UserInfoInput from '../components/UserInfoInput';
import lightTheme from '../themes/LightTheme';
import {LogoNameBackground} from '../themes/Backgrounds';
import * as GlobalActions from '../actions/GlobalStoreActions';
import key from "../constants/StoreKeys";
import Api from '../api/Api';
import userInfoStore from '../stores/UserInfoStore';
import { auth } from '../api/firebase';

const Login = (props) => {
  email = userInfoStore.getData(key.EMAIL)
  passwd = userInfoStore.getData(key.PASSWD)
  console.log("Logging in as", email, passwd)

  auth.signInWithEmailAndPassword(email, passwd)
    .catch((error) => {
      var errorMessage = error.message;
      alert(errorMessage)
    });
};

const LoginScreen = ({navigation}) => {

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("Successfully Logged in")
        email = userInfoStore.getData(key.EMAIL)
        passwd = userInfoStore.getData(key.PASSWD)
        loginInfo = {email: email, passwd: passwd}
        Api.request('POST', 'api/login', loginInfo).then((response) => {
          for (let [respKey, value] of Object.entries(response.data)) {
            GlobalActions.setData(respKey, value)
          }
          GlobalActions.setData(key.UID, user.uid)
          GlobalActions.setData(key.NAME, user.displayName)
          navigation.navigate('Chat')
        });
      } else {
        console.log("Error Logging in!!!!")
      }
    });
    return () => unsubscribe() 
  }, [])

  return (
    <View style={[{flex: 1}, lightTheme.background]}>
        <LogoNameBackground />
        <View style={{flex: .25}}>
          <UserInfoInput placeholder="Email" storeKey={key.EMAIL}/>
          <UserInfoInput placeholder="Password" storeKey={key.PASSWD}/>
        </View>
        <View style={{flex: .35}}>
          <NavigationButton func={Login} navigation={navigation} nextScreen={null} buttonName='Login'/>
          <NavigationButton func={null} navigation={navigation} nextScreen='SignUpEmail' buttonName='Sign Up'/>
        </View>
    </View>
  );
};

export default LoginScreen;
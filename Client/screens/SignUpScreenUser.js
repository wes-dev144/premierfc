import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import UserInfoInput from '../components/UserInfoInput';
import lightTheme from '../themes/LightTheme';
import NavigationButton from '../components/NavigationButton';
import {LogoNameBackground} from '../themes/Backgrounds';
import storeKey from "../constants/StoreKeys";
import { auth } from "../api/firebase";
import userInfoStore from '../stores/UserInfoStore';

const registerUser = () => {
  const signupInfo = userInfoStore.getData(storeKey.SIGNUP_INFO)
  console.log(signupInfo)
  const email = signupInfo.email
  const passwd = signupInfo.passwd

  auth.createUserWithEmailAndPassword(email, passwd).then((userCredential) => {
    var user = userCredential.user;
    user.updateProfile({
      displayName: signupInfo.name
    })
  })
}

const SignUpScreenUser = ({navigation}) => {

  return (
    <View style={[{flex: 1}, lightTheme.background]}>
        <LogoNameBackground imgOpacity={0.75}/>
        <Text style={styles.subtext}>{'Tell Us About Yourself'}</Text>
        <View style={{flex: 1}}>
          <UserInfoInput placeholder="What's your name" signupKey="name" storeKey={storeKey.SIGNUP_INFO}/>
          <UserInfoInput placeholder="Date of Birth" signupKey="dob" storeKey={storeKey.SIGNUP_INFO}/>
          <UserInfoInput placeholder="Zip Code" signupKey="zipCode" storeKey={storeKey.SIGNUP_INFO}/>
          <NavigationButton func={registerUser} navigation={navigation} nextScreen='Login' buttonName='Submit'/>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subtext: {
    flex: .2,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20
  }

});

export default SignUpScreenUser;
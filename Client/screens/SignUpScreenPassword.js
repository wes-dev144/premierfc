import React, {useState} from 'react';
import {View} from 'react-native';
import UserInfoInput from '../components/UserInfoInput';
import lightTheme from '../themes/LightTheme';
import NavigationButton from '../components/NavigationButton';
import storeKey from "../constants/StoreKeys";
import {LogoNameBackground} from '../themes/Backgrounds';

const SignUpScreenPassword = ({navigation}) => {
  return (
    <View style={[{flex: 1}, lightTheme.background]}>
        <LogoNameBackground imgOpacity={0.75}/>
        <View style={{flex:.6}}>
          <UserInfoInput placeholder="Create Password" signupKey="passwd" storeKey={storeKey.SIGNUP_INFO}/>
          <NavigationButton func={null} navigation={navigation} nextScreen='SignUpUser' buttonName='Continue'/>
        </View>
    </View>
  );
};

export default SignUpScreenPassword;
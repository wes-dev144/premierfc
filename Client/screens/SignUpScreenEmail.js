import React, {useState} from 'react';
import {View} from 'react-native';
import * as GlobalActions from '../actions/GlobalStoreActions';
import storeKey from "../constants/StoreKeys";
import UserInfoInput from '../components/UserInfoInput';
import lightTheme from '../themes/LightTheme';
import NavigationButton from '../components/NavigationButton';
import {LogoNameBackground} from '../themes/Backgrounds';

const SignUpScreenEmail = ({navigation}) => {
  return (
    <View style={[{flex: 1}, lightTheme.background]}>
        <LogoNameBackground imgOpacity={0.75}/>
        <View style={{flex: .6}}>
          <UserInfoInput placeholder="Email" storeKey={storeKey.EMAIL}/>
          <NavigationButton func={null} navigation={navigation} nextScreen='SignUpPassword' buttonName='Continue'/>
        </View>
    </View>
)};

export default SignUpScreenEmail;
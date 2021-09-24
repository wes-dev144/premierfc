import React, {useState} from 'react';
import {View} from 'react-native';

import field from "../constants/InputStoreFields";
import StoreInput from '../components/StoreInput';
import lightTheme from '../themes/LightTheme';
import NavigationButton from '../components/NavigationButton';
import {LogoNameBackground} from '../themes/Backgrounds';

const SignUpScreenEmail = ({navigation}) => {
  return (
    <View style={[{flex: 1}, lightTheme.background]}>
        <LogoNameBackground imgOpacity={0.75}/>
        <View style={{flex: .6}}>
          <StoreInput placeholder="Email" field={field.EMAIL}/>
          <NavigationButton func={null} navigation={navigation} nextScreen='SignUpPassword' buttonName='Continue'/>
        </View>
    </View>
)};

export default SignUpScreenEmail;
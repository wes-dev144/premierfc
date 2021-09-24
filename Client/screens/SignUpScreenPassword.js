import React, {useState} from 'react';
import {View} from 'react-native';
import StoreInput from '../components/StoreInput';
import lightTheme from '../themes/LightTheme';
import NavigationButton from '../components/NavigationButton';
import field from "../constants/InputStoreFields";
import {LogoNameBackground} from '../themes/Backgrounds';

const SignUpScreenPassword = ({navigation}) => {
  return (
    <View style={[{flex: 1}, lightTheme.background]}>
        <LogoNameBackground imgOpacity={0.75}/>
        <View style={{flex:.6}}>
          <StoreInput placeholder="Create Password" signupKey="passwd" field={field.PASSWD}/>
          <NavigationButton func={null} navigation={navigation} nextScreen='SignUpUser' buttonName='Continue'/>
        </View>
    </View>
  );
};

export default SignUpScreenPassword;
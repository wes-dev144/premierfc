// @refresh reset
import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';

import lightTheme from '../themes/LightTheme';
import NavigationButton from '../components/NavigationButton';
import { auth } from '../api/firebase';


const SignOff = (props) => {
  auth.signOut()
}

const LogOutScreen = ({navigation}) => {
  return (
    <View style={[{flex: 1}, lightTheme.background]}>
        <NavigationButton func={SignOff} navigation={navigation} nextScreen={null} buttonName='Log Out'/>
    </View>
)};

export default LogOutScreen;
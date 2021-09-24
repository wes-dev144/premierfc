import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import lightTheme from './LightTheme';
import colors from './Colors';
import AppLogo from '../assets/images/Logo.svg'

const LogoNameBackground = ({imgOpacity=1}) => {
    return (
        <View style={styles.header}>
            <Text style={[styles.text, lightTheme.primaryFont]}>Maestri</Text>
            <Text style={[styles.subtext, lightTheme.primaryFont]}>Let's Play</Text>
            <AppLogo style={[styles.image, {opacity:imgOpacity}]}/>
        </View>

)};

const LogoBackground = ({imgOpacity=1}) => {
    return (
        <View style={styles.header}>
            <AppLogo style={[styles.image, {opacity:imgOpacity}]}/>
        </View>
)};

const styles = StyleSheet.create({
    image: {
      position: 'absolute',
      top: 200,
      left: 100,
      right: 0,
      bottom: 0,
      width: 175,
      height: 175,
    },
    header: {
      flex: .4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 60,
      color: colors.PRIMARY
    },
    subtext: {
      padding: 5,
      fontSize: 30,
      color: colors.PRIMARY
    }
  });
export {
    LogoNameBackground,
    LogoBackground
};
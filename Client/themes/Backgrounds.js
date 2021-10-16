import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import theme from './Theme';
import colors from './Colors';
import AppLogo from '../assets/images/Logo.svg'

const LogoNameBackground = ({imgOpacity=1}) => {
    return (
        <View style={styles.mainView}>
            <View style={styles.secondView}>
                <Text style={[styles.text, theme.style.primaryFont]}>Maestri</Text>
                <Text style={[styles.subtext, theme.style.primaryFont]}>Let's Play</Text>
            </View>
            <AppLogo style={[styles.image, {opacity:imgOpacity}]}/>

        </View>

)};

const LogoBackground = ({imgOpacity=1}) => {
    return (
        <View style={styles.mainView}>
            <AppLogo style={[styles.image, {opacity:imgOpacity}]}/>
        </View>
)};

const styles = StyleSheet.create({
    image: {
        width: 175,
        height: 175,
        alignContent: 'center',
    },
    mainView: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.FILL,
        position: 'absolute',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 450
    },
    secondView: {
        alignItems: 'center',
    },
    text: {
        fontSize: 60,
        color: colors.SECONDARY,
        paddingTop: 30
    },
    subtext: {
        fontSize: 30,
        color: colors.SECONDARY
    }
  });
export {
    LogoNameBackground,
    LogoBackground
};
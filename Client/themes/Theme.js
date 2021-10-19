import {StyleSheet} from 'react-native';
import colors from './Colors';

const style = StyleSheet.create({
    background: {
      backgroundColor: colors.FILL,
    },
    button: {
        backgroundColor: colors.SECONDARYD,
    },
    darkText: {
        color: colors.TEXTD,
    },
    lighttext: {
        color: colors.TEXTL,
    },
    primaryFont: {
        fontFamily: 'Facon'
    },
    secondaryFont: {
        fontFamily: 'Aqum'
    },
    textFont: {
        fontFamily: 'Ubuntu-MI'
    },
    subtextFont: {
        fontFamily: 'Swansea-M'
    }
  });

const tabNavigator = {
    activeTintColor: colors.SECONDARY,
    inactiveTintColor: colors.TEXTL,
    style: {
        backgroundColor: colors.FILL,
    },
    indicatorStyle: {
        backgroundColor: colors.SECONDARY
    },
    labelStyle: style.textFont
}

const textInput = { 
    colors: {
        primary: colors.SECONDARY,
        text: colors.TEXTL, 
        background: colors.SECONDARY,
        placeholder: colors.TEXTL
    }
}

const color = {
    background: colors.FILL,
    white: colors.TEXTL,
    gray: '#909090',
    primary: colors.PRIMARY,
    primary_dark: colors.PRIMARYD,
    primary_light: colors.PRIMARYL,
    secondary: colors.SECONDARY,
    secondary_dark: colors.SECONDARYD,
    secondary_light: colors.SECONDARYL,
    text_color_dark: colors.TEXTD,
  }

  export default {style, color, tabNavigator, textInput}
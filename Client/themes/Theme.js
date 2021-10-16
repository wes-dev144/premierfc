import {StyleSheet} from 'react-native';
import colors from './Colors';

const style = StyleSheet.create({
    background: {
      backgroundColor: colors.FILL,
    },
    button: {
        backgroundColor: colors.SECONDARY,
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
    standardFontD: {
        fontFamily: 'TimeBurner',
        color: colors.TEXTD
    },
    standardFontL: {
        fontFamily: 'Cursive',
        color: colors.TEXTL
    }
  });

  const color = {
      background: colors.FILL,
      white: colors.TEXTL,
      primary: colors.PRIMARY,
      primary_dark: colors.PRIMARYD
  }

  export default {style, color}
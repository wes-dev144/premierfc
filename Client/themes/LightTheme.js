import {StyleSheet} from 'react-native';
import colors from './Colors';

const lightTheme = StyleSheet.create({
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
        fontFamily: 'FallingSkyOblique-n5XV'
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

  export default lightTheme;
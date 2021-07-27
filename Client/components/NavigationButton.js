import React from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import lightTheme from '../themes/LightTheme';
import colors from '../themes/Colors';

const runFunction = ({func, ...rest}) => {
  if (func !== null) {
    func(rest)
  }
  if (rest.nextScreen != null) {
    rest.navigation.navigate(rest.nextScreen)
  }
}

const NavigationButton = ({func, ...rest}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.btn, lightTheme.button]} onPress={() => runFunction({func, ...rest})}>
        <Text style={styles.text}>{rest.buttonName}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    height: 50
  },
  text: {
    color: colors.TEXTD,
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    padding: 5
  }
});

export default NavigationButton;
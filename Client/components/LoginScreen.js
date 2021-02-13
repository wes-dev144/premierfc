import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
const LoginScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.title}</Text>
      <Text style={styles.subtext}>{props.subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: .45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'springgreen',
    fontSize: 60,
    fontFamily: 'Quantum'
  },
  subtext: {
    padding: 5,
    color: 'springgreen',
    fontSize: 30,
    fontFamily: 'Azonix'
  }
});

export default LoginScreen;
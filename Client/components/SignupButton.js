import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';

const SignupButton = ({navigation, ...rest}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.text}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "springgreen",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: 40,
  },
  text: {
    color: 'black',
    fontSize: 20,
  },
  container: {
    padding: 4
  }
});

export default SignupButton;
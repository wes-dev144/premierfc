import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';

const ContinueButton = ({navigation, ...rest}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('SignUpUser')}>
        <Text style={styles.text}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "lawngreen",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    height: 50,
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    padding: 20
  }
});

export default ContinueButton;
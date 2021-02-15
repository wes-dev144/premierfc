import React from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';

const SignUpScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/images/login-screen2.jpg')} style={styles.image}>
        <View style={styles.header}>
            <Text style={styles.text}>{'PremiereFC'}</Text>
            <Text style={styles.subtext}>{'Game On'}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    flex: 0.01
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover'
  },
  header: {
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

export default SignUpScreen;
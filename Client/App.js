import React from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import LoginScreen from './components/LoginScreen';
import EmailInput from './components/EmailInput';
import LoginButton from './components/LoginButton';
import PasswordInput from './components/PasswordInput'
import SignupButton from './components/SignupButton';
const App = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/images/login-screen.jpg')} style={styles.image}>
        <LoginScreen title='PremiereFC' subtitle='Game On'/>
        <EmailInput placeholder='Email'/>
        <PasswordInput placeholder='Password'/>
        <LoginButton />
        <SignupButton />
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

});

export default App;
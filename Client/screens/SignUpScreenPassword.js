import React, {useState} from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import PasswordInput from '../components/PasswordInput';
import ContinueButtonUser from '../components/ContinueButtonUser';

const SignUpScreenPassword = ({navigation}) => {
  const [passwd, getPasswdInput] = useState('');

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/images/white-screen.jpg')} style={styles.image}>
        <View style={styles.header}>
            <Text style={styles.text}>{'Nutmeg'}</Text>
            <Text style={styles.subtext}>{'Game On'}</Text>
        </View>
        <PasswordInput placeholder='Create Your Password' getPasswdInput={getPasswdInput}/>
        <ContinueButtonUser navigation={navigation}/>
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
    color: 'lawngreen',
    fontSize: 85,
    fontFamily: 'Quantum'
  },
  subtext: {
    padding: 5,
    color: 'lawngreen',
    fontSize: 30,
    fontFamily: 'Azonix'
  }

});

export default SignUpScreenPassword;
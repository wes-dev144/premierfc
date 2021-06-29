import React, {useState} from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import EmailInput from '../components/EmailInput';
import ContinueButtonPassword from '../components/ContinueButtonPassword';

const SignUpScreenEmail = ({navigation}) => {
  const [email, getEmailInput] = useState('');

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/images/white-screen.jpg')} style={styles.image}>
        <View style={styles.header}>
            <Text style={styles.text}>{'Nutmeg'}</Text>
            <Text style={styles.subtext}>{'Game On'}</Text>
        </View>
        <EmailInput placeholder="What's Your Email?" getEmailInput={getEmailInput}/>
        <ContinueButtonPassword navigation={navigation}/>
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

export default SignUpScreenEmail;
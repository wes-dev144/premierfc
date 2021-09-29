import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import {TextInput} from 'react-native-paper';

import NavigationButton from '../components/NavigationButton';
import lightTheme from '../themes/LightTheme';
import {LogoNameBackground} from '../themes/Backgrounds';

import field from "../constants/InputStoreFields";
import * as Actions from '../actions/StoreActions';
import {AuthContext} from '../navigation/AuthProvider';

const LoginScreen = ({navigation}) => {
  const {login} = useContext(AuthContext);
  const [passwd, setPasswd] = useState("")
  const [email, setEmail] = useState("")
  const Login = () => {
    console.log("Testing inputstore()")
    Actions.InputStore().update(field.EMAIL, email)
    Actions.InputStore().update(field.PASSWD, passwd)
    console.log("Logging in as", email, passwd)
    login(email, passwd)
  };
  return (
    <View style={[{flex: 1}, lightTheme.background]}>
        <LogoNameBackground />
        <View style={{flex: .25}}>
          <TextInput style={styles.input} label="Email" onChangeText={setEmail}/>
          <TextInput style={styles.input} label="Password" secureTextEntry right={<TextInput.Icon name="eye"/>} onChangeText={setPasswd}/>
        </View>
        <View style={{flex: .35}}>
          <NavigationButton func={Login} navigation={navigation} nextScreen={null} buttonName='Login'/>
          <NavigationButton func={null} navigation={navigation} nextScreen='SignUpEmail' buttonName='Sign Up'/>
        </View>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 60,
    width: '100%',
    backgroundColor: 'white',
    fontSize: 16,
    opacity: 0.75,
    marginBottom: 10
  }
});
export default LoginScreen;
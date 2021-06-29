import React from 'react';
import * as GlobalActions from '../actions/GlobalStoreActions';
import storeKey from "../constants/StoreKeys";
import Api from '../api/Api'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Login = (userInfo, navigation) => {
  console.log(userInfo)
  Api.request('POST', 'api/login', userInfo).then((response) => {
    GlobalActions.setData(storeKey.USER_INFO, response.data)
    navigation.navigate('Home')
  });

};

const LoginButton = (props) => {
  var userInfo = {email: props.email, passwd: props.passwd}
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={() => Login(userInfo, props.navigation)}>
        <Text style={styles.text}>Login</Text>
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
    height: 50
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

export default LoginButton;
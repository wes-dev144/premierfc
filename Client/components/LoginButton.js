import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const LoginButton = (props) => {
  console.log(props.email)
  console.log(props.passwd)
  const apiLogin = () => {
    fetch('http://192.168.50.162:5000/api/login',
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: props.email,
              passwd: props.passwd
            })
          })
          .then(response => {
            const statusCode = response.status;
            const data = response.json();
            return Promise.all([statusCode, data]);
          })
          .then((res) => {
            console.log('data', res[0])
            console.log('ret', res[1])
            if (res[0] == 200){
              return props.setAuth(true)
            } else {
              return props.setAuth(false)
            }
          })
  };  


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={apiLogin}>
        <Text style={styles.text}>Login</Text>
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
    height: 40
  },
  text: {
    color: 'black',
    fontSize: 20,
  },
  container: {
    padding: 4
  }
});

export default LoginButton;
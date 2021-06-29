import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const LoginButton = (props) => {
  console.log(props.email)
  console.log(props.passwd)
  const apiLogin = () => {
    fetch('https://72dc582f-60cb-40f1-baf3-74ae16d52d22.mock.pstmn.io/api/test',
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
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
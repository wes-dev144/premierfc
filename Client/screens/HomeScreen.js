import React, {useState} from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import GlobalStore from '../stores/GlobalDataStore';

const HomeScreen = (navigation) => {
    // const [data, setData] = useState('');
    var alldata = GlobalStore.getAllData()
    console.log("CHANGED DATA", alldata.USER_INFO.SOME_DATA)

    return (
    <View style={styles.container}>
        <ImageBackground source={require('../assets/images/login-screen2.jpg')} style={styles.image}>
        <View style={styles.header}>
            <Text style={styles.text}>{'PremiereFC'}</Text>
            <Text style={styles.subtext}>{'Game On'}</Text>
        </View>
        <Text style={styles.subtext}>{alldata.USER_INFO.SOME_DATA}</Text>
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

export default HomeScreen;
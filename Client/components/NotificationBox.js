import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import { runAndNavigate } from '../utils/navigation';
import NavigationBox from './NavigationBox';
import { Avatar } from 'react-native-paper';

const NotificationBox = ({func, ...rest}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => runAndNavigate({func, ...rest})}>
      <Text style={styles.name}>{rest.title}</Text>
      <Text style={styles.text} numberOfLines={4}>{rest.message}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderWidth: .3,
    width: '100%',
  },
  name: {
    color: 'black',
    fontSize: 18,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  text: {
    color: 'black',
    fontSize: 14,
    textAlign: 'left',
  }
});

export default NotificationBox;
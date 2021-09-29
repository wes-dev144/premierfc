import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import { runAndNavigate } from '../utils/navigation';

const ClubInfoBox = ({func, ...rest}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => runAndNavigate({func, ...rest})}>
      <Text style={styles.club}>{rest.club}</Text>
      <Text>{rest.club_numbers} Members | {rest.location}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderWidth: .3,
    width: '100%',
  },
  club: {
    color: 'black',
    fontSize: 20,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  text: {
    color: 'black',
    fontSize: 12,
    textAlign: 'left',
  }
});

export default ClubInfoBox;
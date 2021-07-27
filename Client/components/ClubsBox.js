import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

const ClubInfoBox = (props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.club}>{props.club}</Text>
      <Text>{props.club_numbers} Members | {props.location}</Text>
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
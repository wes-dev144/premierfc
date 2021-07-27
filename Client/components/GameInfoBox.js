import React from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { color } from 'react-native-reanimated';
import colors from '../themes/Colors';

const GameInfoBox = (props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.club}>{props.club}</Text>
      <View style={styles.date}>
        <View style={styles.border}>
          <Text style={styles.dateText}>Mon</Text>
        </View>
        <View style={styles.border}>
          <Text style={styles.dateText}>Tue</Text>
        </View>
        <View style={[styles.border, {backgroundColor: colors.SECONDARY}]}>
          <Text style={styles.dateText}>Wed</Text>
        </View>
        <View style={styles.border}>
          <Text style={styles.dateText}>Thu</Text>
        </View>
        <View style={styles.border}>
          <Text style={styles.dateText}>Fri</Text>
        </View>
        <View style={styles.border}>
          <Text style={styles.dateText}>Sat</Text>
        </View>
        <View style={styles.border}>
          <Text style={styles.dateText}>Sun</Text>
        </View>
      </View>
      <Text>{props.time} | {props.location}</Text>
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
  date: {
    flexDirection: 'row',
  },
  dateText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 9

  },
  border: {
    borderWidth: 1,
    width: 25,
    height: 20,
    margin: 2,
    marginVertical: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default GameInfoBox;
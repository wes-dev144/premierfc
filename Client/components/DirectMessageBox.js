import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import { runAndNavigate } from '../utils/navigation';
import { Avatar } from 'react-native-paper';

const DirectMessageBox = ({func, ...rest}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => runAndNavigate({func, ...rest})}>
      <View style={{flexDirection: 'row', alignItems:'center', paddingEnd: 10}}>
        <Avatar.Text size={40} label="JD"/>
        <View style={{padding: 8, width: '100%'}}>
          <Text style={styles.name}>James Dean</Text>
          <Text style={styles.text} numberOfLines={1}>{rest.last_message}</Text>
        </View>
      </View>

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

export default DirectMessageBox;
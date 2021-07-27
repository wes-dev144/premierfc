import React from 'react';
import * as GlobalActions from '../actions/GlobalStoreActions';
import {View, TextInput, StyleSheet} from 'react-native';
import colors from '../themes/Colors';

const updateInfo = (updatedValue, key) => {
  GlobalActions.setData(key, updatedValue)
};

const UserInfoInput = ({placeholder, ...rest}) => {
  const onChange = (text) => updateInfo(text, rest.storeKey)
  return (
    <View style={styles.container}>
        <TextInput style={styles.input} placeholder={placeholder} 
                  placeholderTextColor={colors.TEXTD} onChangeText={onChange}/>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '100%',
    fontSize: 16,
    backgroundColor: 'white',
    color: 'black',
    opacity: 0.75,
    padding: 8,
    borderBottomWidth: 0.5
  },
  container: {
    padding: 4
  }
});

export default UserInfoInput;
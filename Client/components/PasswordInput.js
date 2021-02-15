import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const PasswordInput = ({placeholder, ...rest}) => {
  const onChange = textValue => rest.getPasswdInput(textValue)
  return (
    <View style={styles.container}>
        <TextInput style={styles.input} placeholder={placeholder} 
                  placeholderTextColor={'darkslategrey'} onChangeText={onChange}/>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '100%',
    fontSize: 16,
    backgroundColor: 'rgba(255,255,255,0.4)',
    padding: 8,
    borderRadius: 10
  },
  container: {
    flex: 0.15,
    padding: 4
  }
});

export default PasswordInput;
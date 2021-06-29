import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const EmailInput = ({placeholder, ...rest}) => {
  const onChange = textValue => rest.getEmailInput(textValue)
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
    backgroundColor: 'ghostwhite',
    padding: 8,
    borderRadius: 10
  },
  container: {
    flex: 0.1,
    padding: 4
  }
});

export default EmailInput;
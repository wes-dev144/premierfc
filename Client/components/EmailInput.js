import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import lightTheme from '../themes/LightTheme';
import colors from '../themes/Colors';

const EmailInput = ({placeholder, ...rest}) => {
  const onChange = textValue => rest.getEmailInput(textValue)
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
    padding: 8,
    borderBottomWidth: 0.5
  },
  container: {
    padding: 4
  }
});

export default EmailInput;
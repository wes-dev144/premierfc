import React from 'react';
import lightTheme from '../themes/LightTheme';
import {LogoBackground} from '../themes/Backgrounds';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import colors from '../themes/Colors';
const SearchScreen = (props) => {
  const onChange = (text) => console.log(text)
  return (
    <View style={[{flex: 1}, lightTheme.background]}>
        <View>
          <TextInput style={styles.input} placeholder="Search" 
                    placeholderTextColor={colors.TEXTD} onChangeText={onChange}/>
          <LogoBackground imgOpacity={0.75}/>
        </View>
        
    </View>
)};
const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '100%',
    fontSize: 16,
    backgroundColor: 'white',
    color: 'black',
    opacity: 0.75,
    padding: 10,
    borderBottomWidth: 1,
    borderRadius: 20
  },
  container: {
    padding: 4
  }
});
export default SearchScreen;
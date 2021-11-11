import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import theme from '../themes/Theme';
import NavigationButton from '../components/NavigationButton';
import field from "../constants/InputStoreFields";
import {LogoNameBackground} from '../themes/Backgrounds';
import { TextInput } from 'react-native-paper';
import * as Actions from '../actions/StoreActions';

const SignUpScreenPassword = (props) => {
    const [showPasswd, setShowPasswd] = useState(true)
    return (
        <View style={[{flex: 1}, theme.style.background]}>
            <LogoNameBackground imgOpacity={0.75}/>
            <View style={{paddingTop: 325, alignItems: 'center'}}>
                <TextInput 
                    style={styles.input}
                    underlineColor={theme.color.secondary}
                    placeholderTextColor={theme.color.gray}
                    theme={theme.textInput}
                    label="Password" 
                    secureTextEntry={showPasswd ? true : false} 
                    right={<TextInput.Icon color='white' name="eye" onPress={() => setShowPasswd(!showPasswd)}/>} 
                    onChangeText={(text) => {Actions.InputStore().update(field.PASSWD, text)}}
                />
                <NavigationButton
                    containerStyle={{paddingTop: 15, width: '95%'}} 
                    func={null}
                    navigation={props.navigation}
                    nextScreen='SignUpUser'
                    buttonName='Continue'
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    input: {
        justifyContent: 'center',
        width: '95%',
        backgroundColor: 'transparent',
        fontSize: 16,
        marginBottom: 10,
    }

});

export default SignUpScreenPassword;
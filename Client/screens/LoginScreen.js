import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import {TextInput} from 'react-native-paper';

import NavigationButton from '../components/NavigationButton';
import {LogoNameBackground} from '../themes/Backgrounds';

import field from "../constants/InputStoreFields";
import * as Actions from '../actions/StoreActions';
import {AuthContext} from '../navigation/AuthProvider';
import theme from '../themes/Theme';

const LoginScreen = (props) => {
    const {login} = useContext(AuthContext);
    const [passwd, setPasswd] = useState("")
    const [email, setEmail] = useState("")
    const [showPasswd, setShowPasswd] = useState(true)
    const Login = () => {
        console.log("Testing inputstore()")
        Actions.InputStore().update(field.EMAIL, email)
        Actions.InputStore().update(field.PASSWD, passwd)
        console.log("Logging in as", email, passwd)
        login(email, passwd)
    };
    return (
        <View style={{flex: 1}}>
            <LogoNameBackground />
            <View style={{paddingTop: 325, alignItems: 'center'}}>
                <TextInput style={styles.input} 
                    label="Email"
                    underlineColor={theme.color.secondary}
                    placeholderTextColor={theme.color.gray}
                    theme={theme.textInput}
                    onChangeText={setEmail}/>
                <TextInput 
                    style={styles.input}
                    underlineColor={theme.color.secondary}
                    placeholderTextColor={theme.color.gray}
                    theme={theme.textInput}
                    label="Password" 
                    secureTextEntry={showPasswd ? true : false} 
                    right={<TextInput.Icon color='white' name="eye" onPress={() => setShowPasswd(!showPasswd)}/>} 
                    onChangeText={setPasswd}
                />

                <NavigationButton 
                    containerStyle={{paddingTop: 5, width: '95%'}} 
                    func={Login}
                    navigation={props.navigation}
                    buttonName='Login'
                />
                <NavigationButton
                    containerStyle={{paddingTop: 10, width: '95%'}} 
                    func={null}
                    navigation={props.navigation}
                    nextScreen='SignUpEmail'
                    buttonName='Sign Up'
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
export default LoginScreen;
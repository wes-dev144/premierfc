import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import {TextInput} from 'react-native-paper';

import NavigationButton from '../components/NavigationButton';
import {LogoNameBackground} from '../themes/Backgrounds';

import field from "../constants/InputStoreFields";
import * as Actions from '../actions/StoreActions';
import {AuthContext} from '../navigation/AuthProvider';

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
            <View style={{paddingTop: 325}}>
                <TextInput style={styles.input} label="Email" onChangeText={setEmail}/>
                <TextInput 
                    style={styles.input} 
                    label="Password" 
                    secureTextEntry={showPasswd ? true : false} 
                    right={<TextInput.Icon name="eye" onPress={() => setShowPasswd(!showPasswd)}/>} 
                    onChangeText={setPasswd}
                />

                <NavigationButton func={Login} navigation={props.navigation} nextScreen={null} buttonName='Login'/>
                <NavigationButton func={null} navigation={props.navigation} nextScreen='SignUpEmail' buttonName='Sign Up'/>
            </View>
         </View> 
    );
};
const styles = StyleSheet.create({
    input: {
        height: 50,
        width: '100%',
        backgroundColor: '#e0defa',
        fontSize: 16,
        opacity: 0.75,
        marginBottom: 10,
    }

});
export default LoginScreen;
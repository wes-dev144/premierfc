import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import StoreInput from '../components/StoreInput';
import theme from '../themes/Theme';
import NavigationButton from '../components/NavigationButton';
import {LogoNameBackground} from '../themes/Backgrounds';
import field from "../constants/InputStoreFields";
import {AuthContext} from '../navigation/AuthProvider';
import InputStore from '../stores/InputStore';
const SignUpScreenUser = (props) => {
    const {register} = useContext(AuthContext);
    const Register = () => {        
        const email = InputStore.get(field.EMAIL)
        const passwd = InputStore.get(field.PASSWD)
        register(email, passwd)
    }
    return (
        <View style={[{flex: 1}, theme.style.background]}>
            <LogoNameBackground imgOpacity={0.75}/>
            <Text style={styles.subtext}>{'Tell Us About Yourself'}</Text>
            <View style={{flex: 1}}>
                <StoreInput placeholder="What's your name" signupKey="name" field={field.NAME}/>
                <StoreInput placeholder="Date of Birth" signupKey="dob" field={field.DOB}/>
                <StoreInput placeholder="Zip Code" signupKey="zipCode" field={field.ZIP}/>
                <NavigationButton func={Register} navigation={props.navigation} nextScreen={null} buttonName='Submit'/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    subtext: {
        flex: .2,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black',
        fontSize: 20
    }

});

export default SignUpScreenUser;
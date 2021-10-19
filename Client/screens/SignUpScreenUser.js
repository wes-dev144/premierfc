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
            <View style={{paddingTop: 310, alignItems: 'center'}}>
                <Text style={[styles.subtext, theme.style.subtextFont]}>{'Tell Us About Yourself'}</Text>
                <StoreInput containerStyle={{width: '95%'}} label="What's your name" field={field.NAME}/>
                <StoreInput containerStyle={{width: '95%'}} label="Date of Birth" field={field.DOB}/>
                <StoreInput containerStyle={{width: '95%'}} label="Zip Code" field={field.ZIP}/>
                <NavigationButton
                    containerStyle={{paddingTop: 15, width: '95%'}} 
                    func={Register}
                    navigation={props.navigation}
                    buttonName='Submit'
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    subtext: {
        textAlign: 'center',
        color: theme.color.white,
        fontSize: 20
    }

});

export default SignUpScreenUser;
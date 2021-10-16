import React, {useState} from 'react';
import {View} from 'react-native';
import StoreInput from '../components/StoreInput';
import theme from '../themes/Theme';
import NavigationButton from '../components/NavigationButton';
import field from "../constants/InputStoreFields";
import {LogoNameBackground} from '../themes/Backgrounds';

const SignUpScreenPassword = (props) => {
    return (
        <View style={[{flex: 1}, theme.style.background]}>
            <LogoNameBackground imgOpacity={0.75}/>
            <View style={{flex:.6}}>
                <StoreInput placeholder="Create Password" signupKey="passwd" field={field.PASSWD}/>
                <NavigationButton func={null} navigation={props.navigation} nextScreen='SignUpUser' buttonName='Continue'/>
            </View>
        </View>
    );
};

export default SignUpScreenPassword;
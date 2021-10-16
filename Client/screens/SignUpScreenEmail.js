import React, {useState} from 'react';
import {View} from 'react-native';

import field from "../constants/InputStoreFields";
import StoreInput from '../components/StoreInput';
import theme from '../themes/Theme';
import NavigationButton from '../components/NavigationButton';
import {LogoNameBackground} from '../themes/Backgrounds';

const SignUpScreenEmail = (props) => {
    return (
        <View style={[{flex: 1}, theme.style.background]}>
            <LogoNameBackground imgOpacity={0.75}/>
            <View style={{flex: .6}}>
                <StoreInput placeholder="Email" field={field.EMAIL}/>
                <NavigationButton func={null} navigation={props.navigation} nextScreen='SignUpPassword' buttonName='Continue'/>
            </View>
        </View>
)};

export default SignUpScreenEmail;
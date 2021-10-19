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
            <View style={{paddingTop: 325, alignItems: 'center'}}>
                <StoreInput containerStyle={{width: '95%'}} label="Email" field={field.EMAIL}/>
                <NavigationButton 
                    containerStyle={{paddingTop: 15, width: '95%'}} 
                    func={null} 
                    navigation={props.navigation} 
                    nextScreen='SignUpPassword' 
                    buttonName='Continue'
                />
            </View>
        </View>
)};

export default SignUpScreenEmail;
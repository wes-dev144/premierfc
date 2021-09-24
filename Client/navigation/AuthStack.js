import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreenEmail from '../screens/SignUpScreenEmail'
import SignUpScreenPassword from '../screens/SignUpScreenPassword'
import SignUpScreenUser from '../screens/SignUpScreenUser'

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName={'Login'}>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{header: () => null}}
            />
            <Stack.Screen
                name="SignUpEmail"
                component={SignUpScreenEmail}
                options={{header: () => null}}
            />
             <Stack.Screen
                name="SignUpPassword"
                component={SignUpScreenPassword}
                options={{header: () => null}}
            />
             <Stack.Screen
                name="SignUpUser"
                component={SignUpScreenUser}
                options={{header: () => null}}
            />
        </Stack.Navigator>
    );
}
export default AuthStack;
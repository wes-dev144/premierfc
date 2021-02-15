import React from 'react';
// import AsyncStorage from '@react-native-community/async-storage';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen'
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
const routeName = 'Login'
const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName={routeName}>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{header: () => null}}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{header: () => null}}
            />
        </Stack.Navigator>
    );
}
export default AuthStack;
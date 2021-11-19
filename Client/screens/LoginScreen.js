import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Platform, PermissionsAndroid } from 'react-native';
import {TextInput} from 'react-native-paper';

import NavigationButton from '../components/NavigationButton';
import {LogoNameBackground} from '../themes/Backgrounds';

import field from "../constants/InputStoreFields";
import * as Actions from '../actions/StoreActions';
import {AuthContext} from '../navigation/AuthProvider';
import theme from '../themes/Theme';


import Geolocation from 'react-native-geolocation-service';
import Api from '../api/Api';
import event from '../constants/Events';

async function requestPermissions() {
    if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization();
        Geolocation.setRNConfiguration({skipPermissionRequests: false, authorizationLevel: 'whenInUse'});
    }

    if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        if (granted) {
            Geolocation.getCurrentPosition(
                //Will give you the current location
                (position) => {
                    //getting the Longitude from the location json
                    const currentLongitude = JSON.stringify(position.coords.longitude);
            
                    //getting the Latitude from the location json
                    const currentLatitude = JSON.stringify(position.coords.latitude);
        
                    const endpoint = "api/geocode/json?latlng=" + currentLatitude + "," + currentLongitude + "&key=" + Api.google_api_key

                    Api.request('POST', endpoint, {url: "https://maps.googleapis.com/maps"}).then((response) => {
                        const location = response.data.results[0].formatted_address
                        Actions.RequestStore().update(location, event.CURRENT_LOCATION)
                    });
                },
                (error) => {
                    console.log(error.message);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 30000,
                    maximumAge: 3600000
                },
            );
        } else {
            Actions.RequestStore().update(false, event.CURRENT_LOCATION)
        }
    }
}

const LoginScreen = (props) => {
    const {login} = useContext(AuthContext);
    const [passwd, setPasswd] = useState("")
    const [email, setEmail] = useState("")
    const [showPasswd, setShowPasswd] = useState(true)
    
    const Login = () => {
        Actions.InputStore().update(field.EMAIL, email)
        Actions.InputStore().update(field.PASSWD, passwd)
        console.log("Logging in as", email, passwd)
        login(email, passwd)
    };
    
    useEffect(() => {
        requestPermissions()
    }, []);

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
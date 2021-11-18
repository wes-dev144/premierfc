import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StoreInput from '../components/StoreInput';
import theme from '../themes/Theme';
import NavigationButton from '../components/NavigationButton';
import {LogoNameBackground} from '../themes/Backgrounds';
import field from "../constants/InputStoreFields";
import {AuthContext} from '../navigation/AuthProvider';
import InputStore from '../stores/InputStore';
import RequestStore from '../stores/RequestsStore';
import event from '../constants/Events';
import { TextInput } from 'react-native-paper';
import Moment from 'moment';
import { IconButton } from 'react-native-paper';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Api from '../api/Api';
import DatePicker from 'react-native-date-picker'
import {MessageDialog, DialogState} from '../components/MessageDialog';
import { DialogType } from '../constants/Enums';

const SignUpScreenUser = (props) => {
    const {register} = useContext(AuthContext)
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [place_id, setPlaceId] = useState(false)

    const dialog = new DialogState()
    const ref = useRef();
    
    const Register = () => {        
        var location = ref.current?.getAddressText()
        const urlEncoded = encodeURIComponent(location)
        const endpoint = "api/place/textsearch/json?query=" + urlEncoded + "&key=" + Api.google_api_key

        Api.request("https://maps.googleapis.com/maps", 'POST', endpoint).then(async (response) => {
            const search = response.data.results
            var addressConfirmed = true
            
            if (search.length != 1) {
                await dialog.openDialog({title: 'Set Location Error', message: "Invalid Address: " + location})
                addressConfirmed = false
            } else if ( search[0].formatted_address != location && search[0].place_id != place_id ) {
                const found_addr = search[0].formatted_address
                addressConfirmed = await dialog.openDialog({title: "Confirm Address", message: 'Did You mean: ' + found_addr, mode: DialogType.INTERACTIVE})
                if (addressConfirmed) {
                    location = found_addr
                    ref.current?.setAddressText(found_addr)
                }
            }

            if (addressConfirmed) {
                const email = InputStore.get(field.EMAIL)
                const passwd = InputStore.get(field.PASSWD)
                register(email, passwd, location, search[0].place_id, Moment(date).format('MM-DD-YYYY'))
            }
        });
    }

    useEffect(() => {
        const location = RequestStore.get(event.CURRENT_LOCATION)
        if (location != false) {
            ref.current?.setAddressText(location);
        }
    }, []);
    
    return (
        <View style={[{flex: 1}, theme.style.background]}>
            <LogoNameBackground imgOpacity={0.75}/>
            <MessageDialog props={dialog}/>
            <View style={{paddingTop: 310, alignItems: 'center'}}>
                <GooglePlacesAutocomplete
                    textInputProps={{
                        InputComp: TextInput,
                        underlineColor: theme.color.secondary,
                        style: {width: '95%', backgroundColor: 'transparent'},
                        theme: theme.textInput,
                        label: 'Set Location'
                    }}
                    ref={ref}
                    renderDescription={row => row.description || row.vicinity}
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(details.formatted_address, data.place_id);
                        setPlaceId(data.place_id)
                    }}
                    onChangeText={(text) => {
                        console.log('Changed text')
                        console.log(text)}}
                    query={{
                        key: Api.google_api_key,
                        language: 'en',
                        components: 'country:us',
                    }}
                    styles={search_input_style}
                />
                <StoreInput containerStyle={{width: '95%'}} label="First Name" field={field.FIRSTNAME}/>
                <StoreInput containerStyle={{width: '95%'}} label="Last Name" field={field.LASTNAME}/>


            </View>
            <View style={styles.date}>
                <IconButton
                    icon="calendar-outline" 
                    onPress={() => setOpen(true)} 
                    size={30} 
                    color={theme.color.secondary}
                />
                <Text style={[styles.subtext,theme.style.subtextFont]}>
                    Date of Birth:   {Moment(date).format('MM/DD/YYYY')}
                </Text>
            </View>

            <DatePicker
                style={{flex:1}}
                modal
                mode='date'
                open={open}
                date={date}
                onConfirm={(date) => {
                setOpen(false)
                setDate(date)
                }}
                onCancel={() => {
                setOpen(false)
                }}
            />
            <NavigationButton
                containerStyle={{paddingTop: 15, width: '95%', alignSelf: 'center'}} 
                func={Register}
                navigation={props.navigation}
                buttonName='Submit'
            />
        </View>
    );
};

const search_input_style = {
    container:{
        flex: 0,
        alignItems: 'center'
    }
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        color: theme.color.white,
        fontSize: 20
    },
    date: {
        flexDirection:'row',
        alignItems: 'center',
    },
    subtext: {
        fontSize: 16,
        color: theme.color.white,
    }
});

export default SignUpScreenUser;
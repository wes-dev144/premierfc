import React, { useState } from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import { Header } from '../components/Header';
import theme from '../themes/Theme';
import event from '../constants/Events';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ClubView from '../components/ClubView';
import StoreInput from '../components/StoreInput';
const Tab = createMaterialTopTabNavigator()

const HomeScreen = (props) => {
    const [registeredClubs, setRegisteredClubs] = useState([])
    const [allClubs, setAllClubs] = useState([])
    return (
        <View style={[styles.container, theme.style.background]}>
            <Header title="Maestri" titleStyle={theme.style.primaryFont} subtitle="Clubs"/>
            <StoreInput textStyle={{fontSize: 16}} label="Search" field={'HOME_SCREEN_SEARCH'}/>
            <Tab.Navigator
                tabBarOptions={theme.tabNavigator}>
                <Tab.Screen 
                    name="Registered" 
                    children={() => <ClubView clubs={registeredClubs} setClubs={setRegisteredClubs} navigation={props.navigation} view_type={event.REQ_MY_CLUBS}/>}
                />
                <Tab.Screen 
                    name="All" 
                    children={() => <ClubView clubs={allClubs} setClubs={setAllClubs}  navigation={props.navigation} view_type={event.REQ_ALL_CLUBS}/>}
                />
            </Tab.Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    input: {
        height: 40,
        width: '100%',
        fontSize: 16,
        margin: 5,
        alignSelf: 'center',
        backgroundColor: 'white',
        color: 'black',
        opacity: 0.75,
        padding: 10,
        borderBottomWidth: 1,
    },

});

export default HomeScreen;
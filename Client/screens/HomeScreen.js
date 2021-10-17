import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import { Header } from '../components/Header';
import theme from '../themes/Theme';
import event from '../constants/Events';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ClubView from '../components/ClubView';
import AllClubsView from '../components/AllClubsView';

const Tab = createMaterialTopTabNavigator()

const HomeScreen = (props) => {
    return (
        <View style={[styles.container, theme.style.background]}>
            <Header title="Maestri" titleStyle={theme.style.primaryFont} subtitle="Clubs"/>
            <TextInput style={styles.input} placeholder="Search" 
                                        placeholderTextColor={theme.color.text_color_dark}/>
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: theme.color.secondary,
                    inactiveTintColor: theme.color.white,
                    style: theme.style.background,
                    indicatorStyle: {backgroundColor: theme.color.secondary},
                    labelStyle: theme.style.textFont
                    
                }}
                >
                <Tab.Screen 
                    name="Registered" 
                    children={() => <ClubView navigation={props.navigation} view_type={event.REQ_MY_CLUBS}/>}
                />
                <Tab.Screen 
                    name="All" 
                    children={() => <AllClubsView navigation={props.navigation} view_type={event.REQ_ALL_CLUBS}/>}
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
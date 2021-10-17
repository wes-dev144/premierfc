import React from 'react';
import theme from '../themes/Theme';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import { ProfileHeader } from '../components/Header';
import { Avatar, IconButton } from 'react-native-paper';
import NavigationButton from '../components/NavigationButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ScrollView } from 'react-native-gesture-handler';

const Tab = createMaterialTopTabNavigator()

const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras venenatis arcu non ante tempor condimentum. Nam luctus, lacus sit amet iaculis vulputate, odio dui volutpat arcu, egestas vulputate ex diam quis leo. Vestibulum mollis diam sit amet arcu tincidunt maximus. Duis nisl dui, consectetur quis commodo eget, viverra ac nunc. Etiam nisl mauris, euismod et metus in, ullamcorper facilisis nisi. Aenean pellentesque molestie ex, eu aliquet sem. Fusce et turpis enim. Praesent non facilisis augue. Suspendisse lorem purus, imperdiet at. "
const AboutView = (props) => {
    return (
        <ScrollView style={[styles.container, theme.style.background]}>
            <Text style={[styles.primaryText, theme.style.textFont]}>About</Text>
            <Text style={[styles.secondaryText, theme.style.subtextFont]}>{text}</Text>
            <Text style={[styles.primaryText, theme.style.textFont]}>Position</Text>
            <Text style={[styles.secondaryText, theme.style.subtextFont]}>Attacking Mid</Text>
            <Text style={[styles.primaryText, theme.style.textFont]}>Skill Level</Text>
            <Text style={[styles.secondaryText, theme.style.subtextFont]}>Intermediate</Text>
            <Text style={[styles.primaryText, theme.style.textFont]}>Years Active</Text>
            <Text style={[styles.secondaryText, theme.style.subtextFont]}>3 years - present</Text>
            <Text style={[styles.primaryText, theme.style.textFont]}>Favorite Team</Text>
            <Text style={[styles.secondaryText, theme.style.subtextFont]}>PSG</Text>
        </ScrollView>
    )
}

const FriendsList = (props) => {
    return (
        <View style={[styles.container, theme.style.background]}>

        </View>
    )
}

const ProfileScreen = (props) => {
    return (
        <View style={[styles.container, theme.style.background]}>
            <ProfileHeader/>
            <View style={styles.profile}>
                <Avatar.Text size={120} style={{backgroundColor: theme.color.secondary_dark}} label="WP"/>
                <Text style={[styles.primaryText, theme.style.textFont]}>Wes Phooprasert</Text>
                <Text style={[styles.secondaryText, theme.style.subtextFont]}>Centreville, VA</Text>
                <View style={styles.editButtons}>
                    <IconButton icon="camera-plus" onPress={() => console.log('Pressed')} size={25} color={theme.color.white}/>
                    <IconButton icon="pencil-plus" onPress={() => console.log('Pressed')} size={25} color={theme.color.white}/>
                </View>
            </View>
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: theme.color.secondary,
                    inactiveTintColor: theme.color.white,
                    style: theme.style.background,
                    indicatorStyle: {backgroundColor: theme.color.secondary},
                    labelStyle: theme.style.textFont
                    
                }}>
                <Tab.Screen 
                    name="Info" 
                    children={() => <AboutView/>}
                />
                <Tab.Screen 
                    name="Friends" 
                    children={() => <FriendsList/>}
                />
            </Tab.Navigator>
        </View>
)};
const styles = StyleSheet.create({
    input: {
        height: 40,
        width: '100%',
        fontSize: 16,
        backgroundColor: 'white',
        color: 'black',
        opacity: 0.75,
        padding: 10,
        borderBottomWidth: 1,
        borderRadius: 20
    },
    editButtons: {
        flexDirection:'row',
        justifyContent: 'flex-start',
    },
    container: {
        flex: 1
    },
    primaryText: {
        paddingTop: 20,
        fontSize: 20,
        color: theme.color.white
    },
    secondaryText: {
        fontSize: 14,
        color: theme.color.white
    },
    profile: {
        padding: 10,
        alignItems: 'center'
    }
});
export default ProfileScreen;
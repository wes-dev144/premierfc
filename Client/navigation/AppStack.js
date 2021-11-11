import React from 'react';
import theme from '../themes/Theme';
import HomeScreen from '../screens/HomeScreen'
import ChatScreen from '../screens/ChatScreen'
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../screens/ProfileScreen';
import DirectMessagesScreen from '../screens/DirectMessagesScreen';
import DrawerUserProfile from '../screens/UserProfilePanel';
import DrawerClubProfile from '../screens/ClubProfilePanel';
import NotificationsScreen from '../screens/NotificationsScreen';
import AppLogo from '../assets/images/Logo.svg';

navigator.geolocation = require('react-native-geolocation-service')

const Stack = createStackNavigator();
const HStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const HomeDrawer = createDrawerNavigator();

const HomeDrawerStack = () => {
    return(
        <HomeDrawer.Navigator drawerContent={props => <DrawerUserProfile {...props} />}>
            <HomeDrawer.Screen name="DrawerHome" component={HomeStack} />
        </HomeDrawer.Navigator>
    );
}

const ClubChatDrawerStack = () => {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerClubProfile {...props} />} drawerPosition="right">
            <Drawer.Screen name="ClubChat" component={ChatScreen}/>
        </Drawer.Navigator>
    );
}



const SearchStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="UserProfile"
                component={ProfileScreen}
                options={{header: () => null}}
            />
        </Stack.Navigator>
    );
}

const HomeStack = () => {
    return (
        <HStack.Navigator initialRouteName="Home">
            <HStack.Screen
                name="Home"
                component={HomeScreen}
                options={{header: () => null}}
            />
            <HStack.Screen
                name="ClubChat"
                component={ChatScreen}
                options={{
                    header: () => null
                }}
            />
        </HStack.Navigator>
    );
}

const AppStack = () => {
    const getTabBarVisibility = (route) => {
        const routeName = route.state
        ? route.state.routes[route.state.index].name
        : '';
        if (routeName === 'DirectMessage' || routeName === 'ClubChat') {
            return false;
        }
        return true;
    };
    return (
        <Tab.Navigator tabBarOptions={{
            // activeTintColor: theme.color.secondary,
            inactiveTintColor: theme.color.background,
            inactiveBackgroundColor: theme.color.background,
            showLabel: false
        }}>
            <Tab.Screen
                name="TabHome"
                component={HomeStack}
                options={({route}) => ({
                    tabBarLabel: 'Home',
                    tabBarIcon: ({color, size}) => (
                        <AppLogo style={{width: 45, height: 40}}/>
                    )
                })}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        console.log('Pressed Tab')
                        e.preventDefault();
                        navigation.navigate("TabHome", {screen: "DrawerHome", params: {screen: "Home"}})
                    }
                })}
            />
            <Tab.Screen
                name="Messages"
                component={DirectMessagesScreen}
                options={({route}) => ({
                    tabBarIcon: ({color, size}) => (
                        <Ionicons 
                            name='md-chatbubble-sharp'
                            color={theme.color.secondary_light}
                            size={size}
                        />
                    ),
                })}
            />

            <Tab.Screen
                name="Notifications"
                component={NotificationsScreen}
                options={({route}) => ({
                    tabBarLabel: 'Notifications',
                    tabBarIcon: ({color, size}) => (
                        <Ionicons 
                            name='notifications'
                            color={theme.color.secondary_light}
                            size={size}
                        />
                    ),
                })}
            />
            <Tab.Screen
                name="UserProfile"
                component={ProfileScreen}
                options={({route}) => ({
                    tabBarLabel: 'UserProfile',
                    tabBarIcon: ({color, size}) => (
                        <Ionicons 
                            name='person-sharp'
                            color={theme.color.secondary_light}
                            size={size}
                        />
                    ),
                })}
            />
        </Tab.Navigator>
    )
}
export default AppStack;
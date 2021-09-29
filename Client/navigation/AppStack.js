import React, {useEffect} from 'react';

import HomeScreen from '../screens/HomeScreen'
import ChatScreen from '../screens/ChatScreen'
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchScreen from '../screens/SearchScreen';
import DirectMessagesScreen from '../screens/DirectMessagesScreen';
import DrawerUserProfile from '../screens/UserProfilePanel';
import DrawerClubProfile from '../screens/ClubProfilePanel';
import NotificationsScreen from '../screens/NotificationsScreen';

// import Icon from 'react-native-ico-material-design';
const Stack = createStackNavigator();
const HStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const HomeDrawer = createDrawerNavigator();

const HomeDrawerStack = ({navigation}) => {
    return(
        <HomeDrawer.Navigator drawerContent={props => <DrawerUserProfile {...props} />}>
            <HomeDrawer.Screen name="DrawerHome" component={HomeStack} />
        </HomeDrawer.Navigator>
    );
}

const ClubChatDrawerStack = ({navigation}) => {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerClubProfile {...props} />} drawerPosition="right">
            <Drawer.Screen name="ClubChat" component={ChatScreen}/>
        </Drawer.Navigator>
    );
}

const HomeStack = ({navigation}) => {
    return (
        <HStack.Navigator initialRouteName="Home">
            <HStack.Screen
                name="Home"
                component={HomeScreen}
                options={{header: () => null}}
            />
            <HStack.Screen
                name="ClubChat"
                component={ClubChatDrawerStack}
                options={{
                    header: () => null,
                    gestureEnabled: true
                }}
            />
        </HStack.Navigator>
    );
}

const SearchStack = ({navigation}) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Search"
                component={SearchScreen}
                options={{header: () => null}}
            />
        </Stack.Navigator>
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
            activeTintColor: '#e91e63',
        }}>
            <Tab.Screen
                name="TabHome"
                component={HomeDrawerStack}
                options={({route}) => ({
                    tabBarLabel: 'Home',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons 
                            name='home'
                            color={color}
                            size={size}
                        />
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
                    tabBarLabel: 'Messages',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons 
                            name='message-text-outline'
                            color={color}
                            size={size}
                        />
                    ),
                })}
            />
            <Tab.Screen
                name="Search"
                component={SearchStack}
                options={({route}) => ({
                    tabBarLabel: 'Search',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons 
                            name='magnify'
                            color={color}
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
                        <MaterialCommunityIcons 
                            name='bell-outline'
                            color={color}
                            size={size}
                        />
                    ),
                })}
            />
        </Tab.Navigator>
    )
}
export default AppStack;
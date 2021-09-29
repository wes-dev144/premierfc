import React, {useContext, useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './AuthProvider';
import { auth } from '../api/firebase';
import Api from '../api/Api';
import * as Actions from '../actions/StoreActions';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import Club from '../classes/Clubs';
import Location from '../classes/Locations';
import User from '../classes/Users';
import event from '../constants/Events';

const Routes = () => {
    const {user, setUser} = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true);
    const onAuthStateChanged = (user) => {
        setUser(user);
        if (user) {
            console.log("Successfully Logged in")
            Api.request('POST', 'api/users/' + user.uid).then((response) => {
                Actions.UserStore().setUID(user.uid)
                Actions.UserStore().setName(user.displayName)
                Actions.UserStore().setZip(response.data["zip"])
                Actions.UserStore().setCity(response.data["city"])
                Actions.UserStore().setState(response.data["state"])
            });
            Api.request('GET', 'api/user/' + user.uid + "/clubs").then((response) => {
                Actions.RequestStore().updateStore(response.data, event.REQ_INIT_DATA)
            });

          } else {
            console.log("Error Logging in!!!!")
          }
        if (initializing) setInitializing(false);
    };
  
    useEffect(() => {
        const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    return(
        <NavigationContainer>
            {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
}

export default Routes;
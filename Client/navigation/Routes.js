import React, {useContext, useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './AuthProvider';
import { auth } from '../api/firebase';
import Api from '../api/Api';
import * as Actions from '../actions/StoreActions';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import event from '../constants/Events';

const Routes = () => {
    const {user, setUser} = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true);
    const onAuthStateChanged = (user) => {
        setUser(user);
        if (user) {
            Api.request('POST', 'api/users/' + user.uid).then((response) => {
                response.data.uid = user.uid
                response.data.name = user.displayName
                Actions.RequestStore().update(response.data, event.REQ_USER_DATA)
            });
            Api.request('GET', 'api/user/' + user.uid + "/clubs").then((response) => {
                Actions.RequestStore().update(response.data, event.REQ_INIT_DATA)
            });

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
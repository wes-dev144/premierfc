import React, {useContext, useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './AuthProvider';
import { auth } from '../api/firebase';
import Api from '../api/Api';
import * as Actions from '../actions/StoreActions';
import field from '../constants/InputStoreFields';
import actions from '../constants/ActionConstants';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import Club from '../classes/Clubs';
import Location from '../classes/Locations';
import User from '../classes/Users';

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
                for (var club of response.data["query"]) {
                    var members = []
                    var members_list = club["members"]
                    const location = new Location(club["zip"], club["city"], club["state"])
                    for (var user of members_list) {
                        members.push(new User(user['uid'], user["name"], user["avatar"]))
                    }
                    Actions.ClubStore().addClub(
                        club["id"], new Club(club["id"], 
                                                club["club_name"],
                                                members,
                                                location,
                                                club["owner"],
                                                club["games"]
                                    ))
                }
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
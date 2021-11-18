import React, {createContext, useState} from 'react';
import { auth } from "../api/firebase";
import InputStore from '../stores/InputStore';
import field from "../constants/InputStoreFields";
import Api from '../api/Api';
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const Login = (email, passwd) => {
        if (email){
                auth.signInWithEmailAndPassword(email, passwd)
                .catch((error) => {
                        var errorMessage = error.message;
                        alert(errorMessage)
                })
        }
    }
    const RegisterUser = (email, passwd, location, place_id, date_of_birth) => {
        console.log('Registering user to Firebase', email)
        auth.createUserWithEmailAndPassword(email, passwd).then((userCredential) => {
            var newUser = userCredential.user;
            const firstname = InputStore.get(field.FIRSTNAME)
            const lastname = InputStore.get(field.LASTNAME)
            const name = firstname + " " + lastname
            
            newUser.updateProfile({
                displayName: name
            })
            const user_info = {
                first_name: firstname,
                last_name: lastname,
                email: email,
                date_of_birth: date_of_birth,
                location: location,
                place_id: place_id,
                user_id: newUser.uid
            }
            console.log("Registering new user to Server DB")
            Api.request('POST', 'api/user', user_info)
        })
    }
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: Login,
                register: RegisterUser
            }}>
            {children}
        </AuthContext.Provider>
    );
};
import React, {createContext, useState} from 'react';
import { auth } from "../api/firebase";
import InputStore from '../stores/InputStore';
import field from "../constants/InputStoreFields";
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
  const RegisterUser = (email, passwd) => {
    console.log('Registering USER', email, passwd)
    auth.createUserWithEmailAndPassword(email, passwd).then((userCredential) => {
      var newUser = userCredential.user;
      newUser.updateProfile({
        displayName: InputStore.get(field.NAME)
      })
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
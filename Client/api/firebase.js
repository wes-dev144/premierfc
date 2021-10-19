import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import { LogBox } from 'react-native';

const firebaseConfig = {
    apiKey: "AIzaSyAYi2wLDa1IIdPDViYcEiU1qC_dBGKbdw0",
    authDomain: "maestri-chat-dev.firebaseapp.com",
    projectId: "maestri-chat-dev",
    storageBucket: "maestri-chat-dev.appspot.com",
    messagingSenderId: "539295714480",
    appId: "1:539295714480:web:b34c6f2407cd048b75ff75"
  };


let app;
LogBox.ignoreLogs(['Setting a timer for a long period of time', 
                    'componentWillMount has been renamed',
                    'componentWillReceiveProps has been renamed',
                ])

// Initialize Firebase
if (firebase.apps.length == 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app()
}

const db = app.firestore();
db.settings({experimentalForceLongPolling: true, merge: true});
const auth = firebase.auth();

export {db, auth};


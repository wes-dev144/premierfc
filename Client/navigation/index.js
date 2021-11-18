import React from 'react';
import Routes from './Routes';
import { AuthProvider } from './AuthProvider';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppRegistry } from 'react-native';

const Providers = () => {
    return (
        <AuthProvider>
            <PaperProvider>
                <Routes/>
            </PaperProvider>
        </AuthProvider>
    );
}

AppRegistry.registerComponent('Client', () => Providers);
export default Providers
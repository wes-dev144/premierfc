import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import theme from '../themes/Theme';
import DirectMessageBox from '../components/DirectMessageBox';
import { Header } from '../components/Header';
import StoreInput from '../components/StoreInput';

const DirectMessagesScreen = (props) => {
    return (
        <View style={[styles.container, theme.style.background]}>
            <Header title="Messages" back_action={true} navigation={props.navigation}/>
            <StoreInput textStyle={{fontSize: 16}} label="Search" field={'HOME_SCREEN_SEARCH'}/>
            <ScrollView>
                <DirectMessageBox name="James Dean" last_message="Hello Jerry how you doing tonight huh? Long time no see bud? What you trying to pull?" func={null}/>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    input: {
        height: 40,
        width: '100%',
        fontSize: 16,
        margin: 5,
        alignSelf: 'center',
        backgroundColor: 'white',
        color: 'black',
        opacity: 0.75,
        padding: 10,
        borderBottomWidth: 1,
    },

});

export default DirectMessagesScreen;
import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground, StyleSheet, ScrollView} from 'react-native';
import ClubInfoBox from '../components/ClubsBox';
import theme from '../themes/Theme';
import InputStore from '../stores/InputStore';
import field from "../constants/InputStoreFields";
import NotificationBox from '../components/NotificationBox';
import { Header } from '../components/Header';

const CreateGameScreen = (props) => {
    return (
        <View style={[styles.container, theme.style.background]}>
            <Header title="Create Game" back_action={true} navigation={props.navigation}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    view: {
        width: '100%',
        borderRadius: 6
    },
});

export default CreateGameScreen;
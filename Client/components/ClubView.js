import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import getClubList from './ClubsBox';
import RequestStore from '../stores/RequestsStore';
import theme from '../themes/Theme'

const ClubView = (props) => {
    useEffect(() => {
        RequestStore.subscribe(onChange, props.view_type);
        return () => RequestStore.unsubscribe(onChange, props.view_type);
    }, []);
    const onChange = (event) => {
        data = RequestStore.get(event)
        props.setClubs(data.clubs)
    }
    return (
        <ScrollView style={theme.style.background}>
            {props.clubs ? getClubList(props.clubs, props.navigation) : null}
        </ScrollView>

    );
};

export default ClubView;
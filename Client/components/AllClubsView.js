import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import getClubList from './ClubsBox';
import RequestStore from '../stores/RequestsStore';
import theme from '../themes/Theme'

const onChange = (event) => {
    data = RequestStore.get(event)
    setClubs(data.clubs)
}

const AllClubsView = (props) => {
    [clubs, setClubs] = useState([])
    useEffect(() => {
        RequestStore.subscribe(onChange, props.view_type);
        return () => RequestStore.unsubscribe(onChange, props.view_type);
    }, []);
    return (
        <ScrollView style={theme.style.background}>
            {clubs ? getClubList(clubs, props.navigation) : null}
        </ScrollView>
    );
};

export default AllClubsView;
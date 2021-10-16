import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground, StyleSheet, ScrollView} from 'react-native';
import Header from '../components/Header';
import ClubInfoBox from '../components/ClubsBox';
import theme from '../themes/Theme';
import RequestStore from '../stores/RequestsStore';
import event from '../constants/Events';
import { getLocationString } from '../utils/util';
import { baseProps } from 'react-native-gesture-handler/dist/src/handlers/gestureHandlers';

const onChange = () => {
    data = RequestStore.get(event.REQ_INIT_DATA)
    setClubs(data.clubs)
}

const getUserClubs = (clubs, navigation) => {
    return clubs.map((club) => {
        return <ClubInfoBox key={club.id} club={club.club_name} location={getLocationString(club)} func={null} 
                        club_numbers={club.members.length} club_id={club.id} navigation={navigation}
                        nextScreen="ClubChat" route_params={{club_id: club.id, club_name: club.club_name}}/>
    })
}

const HomeScreen = (props) => {
    [clubs, setClubs] = useState([])
    useEffect(() => {
        RequestStore.subscribe(onChange, event.REQ_INIT_DATA);
        return () => RequestStore.unsubscribe(onChange, event.REQ_INIT_DATA);
    }, []);
    return (
        <View style={[styles.container, theme.style.background]}>
            <Header title="Clubs"/>
            <View style={styles.gameview}>
                <ScrollView style={[styles.games, {flex:1}]}>
                    {clubs ? getUserClubs(clubs, props.navigation) : null}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        flex: 0.01
    },
    image: {
        flex: 1,
        width: '100%',
        resizeMode: 'cover'
    },
    gameview: {
        flex: .5,
    },
    games: {
        width: '100%',
        borderRadius: 6
    },
    club: {
        color: 'black',
        fontSize: 20,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    subtext: {
        padding: 5,
        color: 'springgreen',
        fontSize: 30,
        fontFamily: 'Azonix'
    },
    text: {
        textAlign: 'left',
        fontSize: 25,
        padding: 10,
        marginTop: 20
        
    }

});

export default HomeScreen;
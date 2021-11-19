import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import theme from '../themes/Theme';
import { runAndNavigate } from '../utils/navigation';
import { Avatar } from 'react-native-paper';
import {UpcomingGameTimeAndLoc, UpcomingGameInfo} from './UpcomingGameBoxes';
import RequestStore from '../stores/RequestsStore';
import { getNameInitials } from '../utils/util';
import event from '../constants/Events';
import Api from '../api/Api';
import * as Actions from '../actions/StoreActions';
import { useEffect, useState } from 'react';

const ClubInfoBox = ({func, ...rest}) => {
    const onChange = (event) => {
        setGameInfo(true)
    }
    
    const [gameInfoSet, setGameInfo] = useState(false)
    useEffect(() => {
        RequestStore.subscribe(onChange, event.SERIES_ID + rest.series_id);
        return () => RequestStore.unsubscribe(onChange, event.SERIES_ID + rest.series_id);
    }, []);
    
    return (
        <TouchableOpacity style={styles.container} onPress={() => runAndNavigate({func, ...rest})}>
            <Avatar.Text size={40} label={getNameInitials(rest.club_name)} style={{backgroundColor: theme.color.secondary_dark}}/>
            <View style={{paddingLeft: 15, width: '60%', alignItems:'flex-start', justifyContent:'flex-start'}}>
                <Text textBreakStrategy='simple' style={[styles.club, theme.style.textFont]}>{rest.club_name}</Text>
                {gameInfoSet ? <UpcomingGameTimeAndLoc series_id={rest.series_id}/> : null}
            </View>
            {gameInfoSet ? <UpcomingGameInfo series_id={rest.series_id}/> : null}
        </TouchableOpacity>
    );
};

const getClubList = (clubs, navigation) => {
    return clubs.map((club) => {
        if (club.series_ids.length != 0) {
            const series_id = club.series_ids[0]
            Api.request('GET', 'api/series/' + series_id + '/games').then((response) => {
                Actions.RequestStore().update(response.data.games, event.SERIES_ID + series_id)
            });
            return <ClubInfoBox key={club.id} club_name={club.name} location={club.location} func={null} 
                            club_numbers={club.member_count} series_id={series_id} club_id={club.id} navigation={navigation}
                            nextScreen="ClubChat" route_params={{club_id: club.id, club_name: club.name}}/>
        }
    })
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomWidth: .75,
        borderBottomColor: '#808080',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'flex-start'

    },
    club: {
        color: theme.color.white,
        fontSize: 20,
        width: '100%',
        textAlign: 'left',
        flexWrap:'wrap',
        alignSelf: 'stretch',
    },
    text: {
        color: theme.color.white,
        fontSize: 13,
        width: '100%',
        textAlign: 'left',

    },
    rightText: {
        color: theme.color.white,
        fontSize: 13,
        textAlign: 'left'
    }
});

export default getClubList;
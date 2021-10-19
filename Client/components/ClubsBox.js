import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import theme from '../themes/Theme';
import { runAndNavigate } from '../utils/navigation';
import { getLocationString } from '../utils/util';
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
        RequestStore.subscribe(onChange, event.GAME_ID + rest.game_id);
        return () => RequestStore.unsubscribe(onChange, event.GAME_ID + rest.game_id);
    }, []);
    
    return (
        <TouchableOpacity style={styles.container} onPress={() => runAndNavigate({func, ...rest})}>
            <Avatar.Text size={40} label={getNameInitials(rest.club)} style={{backgroundColor: theme.color.secondary_dark}}/>
            <View style={{paddingLeft: 15, width: '60%', alignItems:'flex-start', justifyContent:'flex-start'}}>
                <Text textBreakStrategy='simple' style={[styles.club, theme.style.textFont]}>{rest.club}</Text>
                {gameInfoSet ? <UpcomingGameTimeAndLoc game_id={rest.game_id}/> : null}
            </View>
            {gameInfoSet ? <UpcomingGameInfo game_id={rest.game_id}/> : null}
        </TouchableOpacity>
    );
};

const getClubList = (clubs, navigation) => {
    return clubs.map((club) => {
        if (club.games.length != 0) {
            const game_id = club.games[0]
            Api.request('GET', 'api/games/' + club.games[0]).then((response) => {
                Actions.RequestStore().update(response.data, event.GAME_ID + game_id)
            });
            return <ClubInfoBox key={club.id} club={club.club_name} location={getLocationString(club)} func={null} 
                            club_numbers={club.members.length} game_id={game_id} club_id={club.id} navigation={navigation}
                            nextScreen="ClubChat" route_params={{club_id: club.id, club_name: club.club_name}}/>
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
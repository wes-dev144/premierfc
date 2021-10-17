import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import theme from '../themes/Theme'
import Ionicons from 'react-native-vector-icons/Ionicons';
import RequestStore from '../stores/RequestsStore';
import event from '../constants/Events'

const UpcomingGameTimeAndLoc = (props) => {
    const game = RequestStore.get(event.GAME_ID + props.game_id)
    return (
        <View style={{marginLeft: 3}}>
            <View style={{flexDirection: 'row'}}>
                <Text style={[styles.leftText, theme.style.subtextFont]}>{game.date} | {game.start_time}-{game.end_time}</Text>
            </View>
            <Text style={[styles.leftText, theme.style.subtextFont]}>{game.location}</Text>
        </View>
    );
};

const UpcomingGameInfo = (props) => {
    const game = RequestStore.get(event.GAME_ID + props.game_id)
    return (
        <View style={{position: 'absolute', right: 0, paddingRight: 4, alignItems: 'flex-end'}}>
            <Text style={[styles.rightText, theme.style.subtextFont]}>{game.type}</Text>
            <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'flex-end'}}>
                <Text style={[styles.rightText, theme.style.subtextFont]}>{game.roster_count}/{game.roster_limit}</Text>
                <Ionicons 
                    name='person'
                    color={theme.color.white}
                    size={13}
                    style={{paddingLeft: 5,}}
                />
            </View>
            <Text style={[styles.rightText, theme.style.subtextFont]}>SIGNUP {game.signup_day} @{game.signup_time}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    leftText: {
        color: theme.color.white,
        fontSize: 13,
        textAlign: 'left',
    },
    rightText: {
        color: theme.color.white,
        fontSize: 13,
        textAlign: 'right',
    }
});

export {UpcomingGameTimeAndLoc, UpcomingGameInfo};
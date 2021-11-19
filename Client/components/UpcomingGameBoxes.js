import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import theme from '../themes/Theme'
import Ionicons from 'react-native-vector-icons/Ionicons';
import RequestStore from '../stores/RequestsStore';
import event from '../constants/Events'

const UpcomingGameTimeAndLoc = (props) => {
    const games = RequestStore.get(event.SERIES_ID + props.series_id)
    const next_game = games[0]
    return (
        <View style={{marginLeft: 3}}>
            <View style={{flexDirection: 'row'}}>
                <Text style={[styles.leftText, theme.style.subtextFont]}>{next_game.date} | {convert24Hrfmt(next_game.start_time, false)}-{convert24Hrfmt(next_game.end_time)}</Text>
            </View>
            <Text style={[styles.leftText, theme.style.subtextFont]}>{next_game.city_state}</Text>
        </View>
    );
};

const UpcomingGameInfo = (props) => {
    const games = RequestStore.get(event.SERIES_ID + props.series_id)
    const next_game = games[0]
    return (
        <View style={{position: 'absolute', right: 0, paddingRight: 4, alignItems: 'flex-end'}}>
            <Text style={[styles.rightText, theme.style.subtextFont]}>{next_game.type}</Text>
            <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'flex-end'}}>
                <Text style={[styles.rightText, theme.style.subtextFont]}>{next_game.signup_count}/{next_game.max_size}</Text>
                <Ionicons 
                    name='person'
                    color={theme.color.white}
                    size={13}
                    style={{paddingLeft: 5,}}
                />
            </View>
            <Text style={[styles.rightText, theme.style.subtextFont]}>SIGNUP {next_game.signup_day} @{convert24Hrfmt(next_game.signup_time)}</Text>
        </View>
    );
};
const convert24Hrfmt = (time, setMeridiem=true) => {
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)?$/) || [time]
    time = time.slice(1)
    
    if (setMeridiem) {
        time[5] = +time[0] < 12 ? 'AM' : 'PM'
    }
    
    time[0] = +time[0] % 12 || 12

    return time.join('')
}

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
import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import theme from '../themes/Theme';
import { runAndNavigate } from '../utils/navigation';

const ClubInfoBox = ({func, ...rest}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => runAndNavigate({func, ...rest})}>
            <Text style={styles.club}>{rest.club}</Text>
            <Text style={styles.text}>{rest.club_numbers} Members | {rest.location}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 8,
        borderWidth: .3,
        width: '100%',
    },
    club: {
        color: theme.color.white,
        fontSize: 20,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    text: {
        color: theme.color.white,
        fontSize: 12,
        textAlign: 'left',
    }
});

export default ClubInfoBox;
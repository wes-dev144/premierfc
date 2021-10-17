import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import { runAndNavigate } from '../utils/navigation';
import theme from '../themes/Theme';

const NotificationBox = ({func, ...rest}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => runAndNavigate({func, ...rest})}>
            <Text style={styles.name}>{rest.title}</Text>
            <Text style={styles.text} numberOfLines={4}>{rest.message}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        borderBottomWidth: .75,
        borderBottomColor: '#808080',
    },
    name: {
        color: theme.color.white,
        fontSize: 20,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    text: {
        paddingBottom: 2,
        paddingTop: 2,
        color: theme.color.white,
        fontSize: 14,
        textAlign: 'left'
    }
});

export default NotificationBox;
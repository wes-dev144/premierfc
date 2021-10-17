import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import { runAndNavigate } from '../utils/navigation';
import { Avatar } from 'react-native-paper';
import theme from '../themes/Theme'

const DirectMessageBox = ({func, ...rest}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => runAndNavigate({func, ...rest})}>
            <View style={{flexDirection: 'row', alignItems:'center', paddingEnd: 10}}>
                <Avatar.Text size={45} style={{backgroundColor: theme.color.secondary_dark}} label="JD"/>
                <View style={{flex: 1, paddingLeft: 15}}>
                    <Text style={[styles.name, theme.style.subtextFont ]}>{rest.name}</Text>
                    <Text style={[styles.text, theme.style.subtextFont]} numberOfLines={1}>{rest.last_message}</Text>
                </View>
            </View>

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
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

export default DirectMessageBox;
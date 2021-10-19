import React from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import theme from '../themes/Theme';
import colors from '../themes/Colors';
import { runAndNavigate } from '../utils/navigation';

const NavigationButton = ({func, ...rest}) => {
    return (
        <View style={[styles.container, rest.containerStyle]}>
            <TouchableOpacity style={[styles.btn, theme.style.button, rest.buttonStyle]} onPress={() => runAndNavigate({func, ...rest})}>
                <Text style={[styles.text, theme.style.subtextFont, rest.textStyle]}>{rest.buttonName}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        height: 50,
        width: '100%'
    },
    text: {
        color: theme.color.white,
        fontSize: 20,
        fontWeight: 'bold',
    },
    container: {
        padding: 5,
        alignItems: 'center'
    }
});

export default NavigationButton;
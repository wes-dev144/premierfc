import React from 'react';
import * as Actions from '../actions/StoreActions';
import {View, TextInput, StyleSheet} from 'react-native';

const StoreInput = ({placeholder, ...rest}) => {
    const onChange = (text) => Actions.InputStore().update(rest.field, text)
    if (rest.style !== undefined){
        input_style = rest.style
    } else {
        input_style = styles.input
    }
    return (
        <View style={styles.container}>
                <TextInput style={input_style} placeholder={placeholder} 
                                    placeholderTextColor={"grey"} onChangeText={onChange}/>
        </View>
    );
};

var styles = StyleSheet.create({
    input: {
        height: 40,
        width: '100%',
        fontSize: 16,
        backgroundColor: 'white',
        color: 'black',
        opacity: 0.75,
        padding: 8,
        borderBottomWidth: 0.5
    },
    container: {
        padding: 4
    }
});

export default StoreInput;
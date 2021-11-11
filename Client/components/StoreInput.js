import React from 'react';
import * as Actions from '../actions/StoreActions';
import {View, StyleSheet} from 'react-native';
import { TextInput } from 'react-native-paper';
import theme from '../themes/Theme'

const StoreInput = ({...rest}) => {
    const onChange = (text) => Actions.InputStore().update(rest.field, text)
    return (
        <View style={[rest.containerStyle]}>
            <TextInput style={[styles.input, rest.textStyle]}
                label={rest.label? rest.label : null}
                value={rest.value}
                maxLength={rest.maxLength}
                placeholder={rest.placeholder ? rest.placeholder : null}
                underlineColor={theme.color.secondary}
                placeholderTextColor={theme.color.gray}
                theme={theme.textInput}
                onChangeText={onChange}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 60,
        fontSize: 16,
        backgroundColor: 'transparent',
    }
});

export default StoreInput;
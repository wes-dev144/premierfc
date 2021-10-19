import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import theme from '../themes/Theme';

import Ionicons from 'react-native-vector-icons/Ionicons';


const CheckBox = (props) => {
    const setCheck = () => {
        props.onChange(!props.checked)
    }
    
    let checkmark_color = 'white'
    let checkmark_size = 16
    let outline_color = 'black'
    let box_color = 'black'

    if (props.checkmark_color) {
        checkmark_color = props.checkmark_color
    }

    if (props.size) {
        checkmark_size = props.size
    }

    if (props.outline_color) {
        outline_color = props.outline_color
    }

    if (props.box_color) {
        box_color = props.box_color
    } else if (props.outline_color) {
        box_color = outline_color
    }

    const box_style = {
        height: checkmark_size,
        width: checkmark_size,
        borderColor: outline_color
    }

    const checked_color = {
        backgroundColor: box_color
    }

    return (
    <View style={[styles.checkBox, props.containerStyle]}>
        <TouchableOpacity style={[box_style, styles.checkboxBase, props.checked && checked_color]} onPress={setCheck}>
            {props.checked &&  <Ionicons style={{bottom: 2, right: 1}} name="md-checkmark-sharp" size={checkmark_size} color={checkmark_color} />}
        </TouchableOpacity>
        <Text style={[{paddingLeft: 5}, theme.style.subtextFont, {fontSize: checkmark_size, color: checkmark_color }, props.textStyle]}>{props.label}</Text>
    </View>
)}

const styles = StyleSheet.create({
    checkboxBase: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 4,
        borderWidth: 2,
        backgroundColor: 'transparent',
      },
      checkBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})

export default CheckBox;
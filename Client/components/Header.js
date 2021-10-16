import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import theme from '../themes/Theme';

const Header = (props) => {  
    return (
        <Appbar.Header style={styles.header}>
            <Appbar.Content style={styles.title} titleStyle={[styles.text, theme.style.secondaryFont]} title={props.title}/>
            {props.back_action ? <Appbar.BackAction onPress={() => {props.navigation.goBack()}} />: null}
        </Appbar.Header>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: theme.color.primary
    },
    title: {
        position:'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        textAlign: 'center'
    }
})
export default Header;
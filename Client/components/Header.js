import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import theme from '../themes/Theme';
import { auth } from '../api/firebase';

const SignOut = (props) => {
    auth.signOut()
  }

const Header = (props) => {
    let titleStyle = theme.style.secondaryFont
    let subtitleStyle = theme.style.secondaryFont
    if (props.titleStyle) {
        titleStyle = props.titleStyle
    }
    if (props.subtitleStyle) {
        subtitleStyle = props.subtitleStyle
    }
    return (
        <Appbar.Header style={styles.header}>
            <Appbar.Content 
                style={styles.title}
                titleStyle={[styles.text, titleStyle]} 
                title={props.title} 
                subtitleStyle={[styles.text, subtitleStyle]}
                subtitle={props.subtitle}/>
            {props.back_action ? <Appbar.BackAction onPress={() => {props.navigation.goBack()}} />: null}
        </Appbar.Header>
    );
};

const ProfileHeader = (props) => {
    return (
        <Appbar.Header style={styles.header}>
            <Appbar.Action icon='dots-vertical' onPress={() => {}}/>
            <Appbar.Content 
                titleStyle={[styles.text, theme.style.secondaryFont]} 
                title="Profile" 
            />
            
            <Appbar.Action icon='exit-to-app' onPress={() => SignOut()}/>
        </Appbar.Header>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: theme.color.primary,
    },
    settings: {
        backgroundColor: 'blue',
        
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
export {Header, ProfileHeader}
import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground, StyleSheet, ScrollView} from 'react-native';
import Header from '../components/Header';
import ClubInfoBox from '../components/ClubsBox';
import theme from '../themes/Theme';
import RequestStore from '../stores/RequestsStore';
import event from '../constants/Events';
import { getLocationString } from '../utils/util';
import { baseProps } from 'react-native-gesture-handler/dist/src/handlers/gestureHandlers';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Divider, Title, Paragraph } from 'react-native-paper';
import { Rating } from "react-native-rating-element";
import { Avatar } from 'react-native-paper';
import { Banner } from 'react-native-paper';
import { ImageSlider } from "react-native-image-slider-banner";

function InfoScreen() {
    return (
      <View style={[styles.container]}>
      <ScrollView>
            <View>
                <ImageSlider 
                    localImg={true}
                    data={[
                        //{img: 'https://tvline.com/wp-content/uploads/2021/03/the-patrick-star-show-spongebob-squarepants-spinoff.jpg'},
                        //{img: 'https://tvline.com/wp-content/uploads/2021/03/the-patrick-star-show-spongebob-squarepants-spinoff.jpg'}
                        require('../assets/images/Patrick_Star_social_image_1.jpg'),
                        require('../assets/images/mesut-ozil-teammates-gty-mem-180723_hpEmbed_23x15_992.jpg')
                    ]}
                    autoPlay={false}
                    onItemChanged={(item) => console.log("item", item)}
                    closeIconColor="#fff"
                />
            </View>
        <View style={[styles.rating]}>
            <Rating
                rated={4.1}
                totalCount={5}
                ratingColor="#f1c644"
                ratingBackgroundColor="#d4d4d4"
                size={18}
                readonly
                icon="ios-star"
                direction="row"
            />
        </View>
        <Title style={[styles.title]}>Description:</Title>
            <Paragraph style={[styles.paragraph]}>First Touch FC is open to anyone, male or female. The play is typically at the Intermediate to Advance level. Matches are fast and competitive but friendly and fun. We play for the love of the game. No attitudes, just a great way to start the day with some footie.</Paragraph>
            <Paragraph style={[styles.paragraph]}>There’s a maximum of 2 games and match size varies from 7v7 to 9v9 depending on sign ups. Matches start promptly at 7:00 AM… we ask players to arrive early enough to suit up, stretch, and allow for team selection before hand so that we have the full hour for a great game</Paragraph>
        <Divider />
        <Title style={[styles.title]}>Game Details:</Title>
        <Divider />
        <Title style={[styles.title]}>Organizers:</Title>
            <View style={[styles.avatar]}>
                <Avatar.Text size={50} label="EM" />
                <Avatar.Text size={50} label="OP" />
                <Avatar.Text size={50} label="OT" />
            </View>
        <Divider />
        <Title style={[styles.title]}>Members:</Title>
            <View style={[styles.avatar]}>
                <Avatar.Text size={50} label="OP" />
                <Avatar.Text size={50} label="OT" />
                <Avatar.Text size={50} label="DM" />
                <Avatar.Text size={50} label="EM" />
                <Avatar.Text size={50} label="SS" />
            </View>
        <Divider />
      </ScrollView>
      </View>
    );
}
function ClubHouseScreen() {
    return (
      <View style={[styles.container]}>
        
      </View>
    );
}
function UpcomingGameScreen() {
    return (
      <View style={[styles.container]}>
        <Text> </Text>
      </View>
    );
}
function ScheduleScreen() {
    return (
      <View style={[styles.container]}>
        <Text> </Text>
      </View>
    );
}

const ClubHomeScreen = (props) => {
    const [visible, setVisible] = React.useState(true);
    const Tab = createMaterialTopTabNavigator();
    return (
        <View style={[styles.container, theme.style.background]}>
            <Header title="Clubs"/>
            <View>
                <Banner visible={visible}
                    actions={[
                    {
                        label: 'ok',
                        onPress: () => setVisible(false)
                    },
                    {
                        label: 'see more',
                        onPress: () => setVisible(false)
                    },
                    ]}>
                    <Text style={[styles.bannertext]}>There is limited parking for today's game, so plan accordingly. Post in chat if you can't find parking when you arrive.</Text>
                </Banner>
            </View>
            <NavigationContainer independent={true}>
                <Tab.Navigator>
                    <Tab.Screen name="Info" component={InfoScreen} />
                    <Tab.Screen name="Club House" component={ClubHouseScreen} />
                    <Tab.Screen name="Upcoming Game" component={UpcomingGameScreen} />
                    <Tab.Screen name="Schedule" component={ScheduleScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        flex: 0.01
    },
    image: {
        flex: 1,
        width: '100%',
        resizeMode: 'cover'
    },
    gameview: {
        flex: .5,
    },
    games: {
        width: '100%',
        borderRadius: 6
    },
    club: {
        color: 'black',
        fontSize: 20,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    subtext: {
        padding: 5,
        color: 'springgreen',
        fontSize: 30,
        fontFamily: 'Azonix'
    },
    text: {
        textAlign: 'left',
        fontSize: 25,
        padding: 10,
        marginTop: 20
        
    },
    avatar: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 4,
        paddingBottom: 8
    },
    bannertext: {
        fontSize: 18,
    },
    paragraph: {
        paddingHorizontal: 4,
    },
    title: {
        paddingHorizontal: 4,
    },
    rating: {
        alignItems: 'center'
    }

});

export default ClubHomeScreen;
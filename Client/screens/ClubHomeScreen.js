import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground, StyleSheet, ScrollView} from 'react-native';
import { Header } from '../components/Header';
import ClubInfoBox from '../components/ClubsBox';
import theme from '../themes/Theme';
import RequestStore from '../stores/RequestsStore';
import event from '../constants/Events';
import { getLocationString } from '../utils/util';
import { baseProps } from 'react-native-gesture-handler/dist/src/handlers/gestureHandlers';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Divider, Title, Subheading, Paragraph } from 'react-native-paper';
import { Rating } from "react-native-rating-element";
import { Avatar } from 'react-native-paper';
import { Banner } from 'react-native-paper';
import { ImageSlider } from "react-native-image-slider-banner";
//import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

function InfoScreen() {
    return (
      <View style={[styles.container]}>
      <ScrollView>
            <View style={[styles.imagecontainer]}>
                <ImageSlider 
                    data={[
                        {img: 'https://soccerinteraction.com/wp-content/uploads/2019/01/Soccer-in-Australia.jpg'},
                        {img: 'https://i.nextmedia.com.au/Utils/ImageResizer.ashx?n=https%3A%2F%2Fi.nextmedia.com.au%2FNews%2FGettyImages-1185984966_Cropped.jpg&h=630&w=1120&c=1&s=1'}
                    ]}
                    autoPlay={false}
                    onItemChanged={(item) => console.log("item", item)}
                    onClick={(item) => console.log("item", item)}
                    closeIconColor="#fff"
                    caroselImageStyle={{height: 240}}
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
            <Paragraph style={[styles.paragraph]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Nisi scelerisque eu ultrices vitae auctor eu augue ut. Congue eu consequat ac felis donec et odio pellentesque diam. Volutpat diam ut venenatis tellus in. Pharetra convallis posuere morbi leo urna molestie at. Volutpat odio facilisis mauris sit amet massa vitae tortor. Egestas congue quisque egestas diam in arcu cursus. Ligula ullamcorper malesuada proin libero nunc consequat interdum varius sit. Elementum curabitur vitae nunc sed velit dignissim sodales ut. Urna molestie at elementum eu facilisis sed odio morbi.</Paragraph>
            <Paragraph style={[styles.paragraph]}>Vel pharetra vel turpis nunc. Massa sapien faucibus et molestie ac feugiat. Amet massa vitae tortor condimentum lacinia quis vel eros donec. Libero id faucibus nisl tincidunt eget. Lorem donec massa sapien faucibus et molestie ac feugiat sed. Iaculis at erat pellentesque adipiscing commodo. Molestie nunc non blandit massa enim nec. Eget dolor morbi non arcu risus. Egestas diam in arcu cursus euismod quis viverra. At erat pellentesque adipiscing commodo elit. Egestas maecenas pharetra convallis posuere morbi leo urna molestie at. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Risus quis varius quam quisque id.</Paragraph>
        <Divider />
        <Title style={[styles.title]}>Game Details:</Title>
            <Subheading style={[styles.subheading]}><B>Game Days: </B></Subheading>
            <Subheading style={[styles.subheading]}><B>Game Time: </B><Text>7:00 - 8:00AM</Text></Subheading>
            <Subheading style={[styles.subheading]}><B>Field Type: </B><Text>Astroturf</Text></Subheading>
            <Subheading style={[styles.subheading]}><B>Playing Level: </B><Text>Intermediate - Advanced</Text></Subheading>
            <Subheading style={[styles.subheading]}><B>Locations: </B><Text>Ben Lomond Regional Park, Signal Hill Park, Dean Park</Text></Subheading>
            {/* <View>
                <MapView style={[styles.map]}
                    provider={PROVIDER_GOOGLE}
                    region={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.09,
                        longitudeDelta: 0.035
                    }}>
                </MapView>
            </View> */}
        <Divider />
        <Title style={[styles.title]}>Organizers:</Title>
            <View style={[styles.avatar]}>
                <Avatar.Text size={50} label="OP" />
                <Avatar.Text size={50} label="OT" />
                <Avatar.Text size={50} label="DM" />
            </View>
        <Divider />
        <Title style={[styles.title]}>Members:</Title>
            <View style={[styles.avatar]}>
                <Avatar.Text size={50} label="OP" />
                <Avatar.Text size={50} label="OT" />
                <Avatar.Text size={50} label="DM" />
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
            <Header title="Clubs" back_action={true}/>
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
        fontSize: 18
    },
    paragraph: {
        paddingHorizontal: 4,
        fontSize: 13
    },
    title: {
        paddingHorizontal: 4,
        fontSize: 16
    },
    subheading: {
        paddingHorizontal: 4,
        fontSize: 13,
    },
    rating: {
        alignItems: 'center',
        paddingTop: 5
    },
    imagecontainer: {
        paddingTop: 10 
    },
    map: {
        height: '50%' 
    },

});

export default ClubHomeScreen;
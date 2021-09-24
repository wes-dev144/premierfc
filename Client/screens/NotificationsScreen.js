import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground, StyleSheet, ScrollView} from 'react-native';
import GameInfoBox from '../components/GameInfoBox';
import ClubInfoBox from '../components/ClubsBox';
import NavigationBox from '../components/NavigationBox';
import lightTheme from '../themes/LightTheme';
import colors from '../themes/Colors';
import {LogoBackground} from '../themes/Backgrounds';
import InputStore from '../stores/InputStore';
import field from "../constants/InputStoreFields";
import Api from '../api/Api';
import NotificationBox from '../components/NotificationBox';
const onChange = () => {
  data = InputStore.get(field.USER_CLUBS)
  console.log('Getting changed data', typeof(data), data)
  setClubs(data)
}

const getUserClubs = (clubs, navigation) => {
  console.log('Getting club data', typeof(clubs), clubs)
  var clubData = Object.values(clubs)
  console.log(clubData)
  return clubData.map((club) => {
    // console.log('CLUB INFO', club)
    return <ClubInfoBox key={club.id} club={club.club_name} location={club.location} func={null} 
        club_numbers={club.member_count} club_id={club.id} navigation={navigation} nextScreen="ClubChat"/>
  })
}

const NotificationsScreen = ({navigation}) => {
    // [clubs, setClubs] = useState({})
    // useEffect(() => {
    //   InputStore.addChangeListener(onChange);
    //   return () => InputStore.removeChangeListener(onChange);
    // }, []);

    return (
      <View style={[styles.container, lightTheme.background]}>
        <Text style={[styles.text, lightTheme.standardFontD]}>Notifications</Text>
        <ScrollView style={[styles.games]}>
          <NotificationBox title="RSVP for SBU Soccer" message="RSVP Time: 3:00PM/EST" func={null}/>
        </ScrollView>
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
    
  }

});

export default NotificationsScreen;
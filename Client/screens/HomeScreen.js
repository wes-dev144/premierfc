import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground, StyleSheet, ScrollView} from 'react-native';
import GameInfoBox from '../components/GameInfoBox';
import ClubInfoBox from '../components/ClubsBox';
import lightTheme from '../themes/LightTheme';
import RequestStore from '../stores/RequestsStore';
import event from '../constants/Events';
import { getLocationString } from '../utils/util';

const onChange = () => {
  data = RequestStore.get(event.REQ_INIT_DATA)
  setClubs(data.clubs)
}

const getUserClubs = (clubs, navigation) => {
  return clubs.map((club) => {
    return <ClubInfoBox key={club.id} club={club.club_name} location={getLocationString(club)} func={null} 
            club_numbers={club.members.length} club_id={club.id} navigation={navigation}
            nextScreen="ClubChat" route_params={{club_id: club.id}}/>
  })
}

const HomeScreen = (props) => {
    [clubs, setClubs] = useState([])
    useEffect(() => {
      RequestStore.subscribe(onChange, event.REQ_INIT_DATA);
      return () => RequestStore.unsubscribe(onChange, event.REQ_INIT_DATA);
    }, []);
    return (
      <View style={[styles.container, lightTheme.background]}>
        <View style={styles.gameview}>
          <Text style={[styles.text, lightTheme.standardFontD]}>Upcoming Games</Text>
          <ScrollView style={[styles.games]}>
            <GameInfoBox club='NYCFooty' time='7:00PM-9:00PM' location='Brooklyn Bridge Pier 5'/>
            <GameInfoBox club='NYCFooty' time='7:00PM-9:00PM' location='Brooklyn Bridge Pier 5'/>
            <GameInfoBox club='NYCFooty' time='7:00PM-9:00PM' location='Brooklyn Bridge Pier 5'/>
            <GameInfoBox club='NYCFooty' time='7:00PM-9:00PM' location='Brooklyn Bridge Pier 5'/>
            <GameInfoBox club='LongIslandFC' time='5:30PM-8:30PM' location='Queens College Soccer Field'/>
            <GameInfoBox club='TikiTakFC' time='7:00AM-9:00AM' location='Long Island City High School'/>
            <GameInfoBox club='NYURec' time='4:00PM-6:00PM' location='Brooklyn Bridge Pier 5'/>
            <GameInfoBox club='SBUFutsal' time='3:00PM-5:00PM' location='SBU Rec Center'/>
            <GameInfoBox club='SBUD1Soccer' time='1:00PM-3:00PM' location='South P Lot'/>
          </ScrollView>

        </View>
        <View style={styles.gameview}>
        <Text style={[styles.text, lightTheme.standardFontD]}>Clubs</Text>
          <ScrollView style={[styles.games, {flex:1}]}>
            {clubs ? getUserClubs(clubs, props.navigation) : null}
          </ScrollView>
        </View>
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
    
  }

});

export default HomeScreen;
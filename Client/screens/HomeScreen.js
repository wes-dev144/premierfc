import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground, StyleSheet, ScrollView} from 'react-native';
import GameInfoBox from '../components/GameInfoBox';
import ClubInfoBox from '../components/ClubsBox';
import NavigationBox from '../components/NavigationBox';
import lightTheme from '../themes/LightTheme';
import colors from '../themes/Colors';
import {LogoBackground} from '../themes/Backgrounds';
import * as Actions from '../actions/StoreActions';
import RequestStore from '../stores/RequestsStore';
import event from '../constants/Events';
import Api from '../api/Api';
import { getLocationString } from '../utils/util';

// import { db, auth } from '../api/firebase';
const getClubInfo = (props) => {
  console.log(props)
  console.log("api", props.club_id)
  Api.request('GET', 'api/club/' + props.club_id).then((response) => {
    console.log("CLUB INFO", response.data)
    Actions.RequestStore().updateStore(response.data, event.GET_CLUB_INFO)
    // GlobalActions.setData(response.club_id, response.club_info)
  });
}

const onChange = () => {
  data = RequestStore.getData(event.REQ_INIT_DATA)
  console.log(data)
  setClubs(data['clubs'])
}

const getUserClubs = (clubs, navigation) => {
  // var clubData = Object.values(clubs)
  return clubs.map((club) => {
    return <ClubInfoBox key={club.id} club={club.club_name} location={getLocationString(club)} func={getClubInfo} 
        club_numbers={club.members.length} club_id={club.id} navigation={navigation} nextScreen="ClubChat"/>
  })
}

const HomeScreen = ({navigation}) => {
    [clubs, setClubs] = useState([])
    useEffect(() => {
      RequestStore.addListener(onChange, event.REQ_INIT_DATA);
      return () => RequestStore.removeListener(onChange, event.REQ_INIT_DATA);
    }, []);
    console.log('Current clubs', clubs)
    return (
      <View style={[styles.container, lightTheme.background]}>
        <View style={styles.gameview}>
          {/* <LogoBackground imgOpacity={0.5}/> */}
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
            {/* <NavigationBox func={getClubInfo} navigation={navigation}>
              <ClubBox club='SBUD1Soccer' location='Stony Brook, NY' club_numbers='120'/>
            </NavigationBox> */}
            {/* <ClubInfoBox club='SBUD1Soccer' location='Stony Brook, NY' func={getClubInfo} club_numbers={600} club_id="aaa123" navigation={navigation} nextScreen="ClubChat"/>
            <ClubInfoBox club='SBUFutsal' location='Stony Brook, NY' club_numbers={242} club_id="b1243" navigation={navigation} nextScreen="ClubChat"/>
            <ClubInfoBox club='NYURec' location='New York, NY' club_numbers={321} club_id="aaa123" navigation={navigation} nextScreen="ClubChat"/>
            <ClubInfoBox club='LongIslandFC' location='Ronkonkoma, NY' club_numbers={501} club_id="b1243"/>
            <ClubInfoBox club='NYCFooty' location='New York, NY' club_numbers={501} club_id="b1243"/>
            <ClubInfoBox club='TikiTakFC' location='Ronkonkoma, NY' club_numbers={501} club_id="b1243"/> */}
            {clubs ? getUserClubs(clubs, navigation) : null}
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
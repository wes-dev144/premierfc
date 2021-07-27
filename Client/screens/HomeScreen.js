import React, {useState} from 'react';
import {View, Text, ImageBackground, StyleSheet, ScrollView} from 'react-native';
import GameInfoBox from '../components/GameInfoBox';
import ClubInfoBox from '../components/ClubsBox';
import lightTheme from '../themes/LightTheme';
import colors from '../themes/Colors';
import {LogoBackground} from '../themes/Backgrounds';

const HomeScreen = (navigation) => {
    return (
      <View style={[styles.container, lightTheme.background]}>
        <View style={styles.gameview}>
          <LogoBackground imgOpacity={0.5}/>
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
            <ClubInfoBox club='SBUD1Soccer' location='Stony Brook, NY' club_numbers={600}/>
            <ClubInfoBox club='SBUFutsal' location='Stony Brook, NY' club_numbers={242}/>
            <ClubInfoBox club='NYURec' location='New York, NY' club_numbers={321}/>
            <ClubInfoBox club='LongIslandFC' location='Ronkonkoma, NY' club_numbers={501}/>
            <ClubInfoBox club='NYCFooty' location='New York, NY' club_numbers={501}/>
            <ClubInfoBox club='TikiTakFC' location='Ronkonkoma, NY' club_numbers={501}/>
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
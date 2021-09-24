import React, {useState} from 'react';
import {View, Text, ImageBackground, StyleSheet, ScrollView, useWindowDimensions} from 'react-native';
import GameInfoBox from '../components/GameInfoBox';
import ClubInfoBox from '../components/ClubsBox';
import lightTheme from '../themes/LightTheme';
import colors from '../themes/Colors';
import {LogoBackground} from '../themes/Backgrounds';
import Api from '../api/Api';
import { TabView, SceneMap } from 'react-native-tab-view';



const FirstRoute = () => (
  <View style={{ flex: 1,}}>

  </View>
);

const SecondRoute = () => (
  <View style={{ flex: 1,}}>
    
  </View>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const TabView = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);
}

const HomeScreen = ({navigation}) => {

    return (
      <View style={[styles.container, lightTheme.background]}>
        <View style={styles.gameview}>
          <Text style={[styles.text, lightTheme.standardFontD]}>Upcoming Games</Text>
          <ScrollView style={[styles.games]}>
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
import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import theme from '../themes/Theme';
import field from "../constants/InputStoreFields";
import { Header } from '../components/Header';
import DatePicker from 'react-native-date-picker'
import { IconButton } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import Moment from 'moment';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Api from '../api/Api';
import StoreInput from '../components/StoreInput';
import CheckBox from '../components/CheckBox';
import NavigationButton from '../components/NavigationButton';
const TeamColors = (props) => {
    return(
        <View style={styles.infoRow}>
            <Text style={[styles.text,theme.style.subtextFont, styles.gameDetailText]}>Team {props.number}: </Text>
            <StoreInput textStyle={styles.input} maxLength={2} placeholder="Color" field={"TEAM_" + props.number + "_COLOR"}/>
        </View>
    )
}

const mapNumTeamColors = (numTeams) => {
    return numTeams.map((number) => {
        return <TeamColors key={number} number={number} />
    })
}

const createGame = () => {
    console.log('Created game!')
}

const CreateGameScreen = (props) => {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [Mon, setMon] = useState(false)
    const [Tue, setTue] = useState(false)
    const [Wed, setWed] = useState(false)
    const [Thu, setThu] = useState(false)
    const [Fri, setFri] = useState(false)
    const [Sat, setSat] = useState(false)
    const [Sun, setSun] = useState(false)
    const [numTeams, setNumTeams] = useState([1,2])
    const [numTeamsString, setNumTeamsString] = useState("2")
    const [cleatsRequired, setCleatsRequired] = useState(false)
    const [turfShoesRequired, setTurfShoesRequired] = useState(false)
    const [pitchType, setPitchType] = useState(false)
    const onSetNumTeams = (num_string) => {
        let num_teams = new Array()
        for (let i = 1; i < parseInt(num_string) + 1; i++){
            num_teams.push(i)
        }
        setNumTeams(num_teams)
        setNumTeamsString(num_string)
    }
    return (
        <View style={[styles.container, theme.style.background]}>
            <Header title="Create Game" back_action={true} navigation={props.navigation}/>           
            <Text style={[styles.headerText,theme.style.textFont]}>Set Date and Time</Text>
            <View style={styles.date}>
                <IconButton
                    icon="calendar-outline" 
                    onPress={() => setOpen(true)} 
                    size={35} 
                    color={theme.color.secondary}
                />
                <View>
                    <Text style={[styles.text, {paddingLeft: 15},theme.style.subtextFont]}>
                        Date: {Moment(date).format('MM/DD/YYYY')}
                    </Text>
                    <Text style={[styles.text, {paddingLeft: 15},theme.style.subtextFont]}>
                        Time: {Moment(date).format('hh:mm A')}
                    </Text>
                </View>
            </View>
            <View>
                <Text style={[styles.headerText,theme.style.textFont]}>Set Reccurance</Text>
                <View style={styles.checkBoxes}>
                    <CheckBox size={14} outline_color={theme.color.secondary} 
                        label='Mon' checked={Mon} onChange={setMon}/>
                    <CheckBox size={14} outline_color={theme.color.secondary} 
                        label='Tue' checked={Tue} onChange={setTue}/>
                    <CheckBox size={14} outline_color={theme.color.secondary} 
                        label='Wed' checked={Wed} onChange={setWed}/>
                    <CheckBox size={14} outline_color={theme.color.secondary} 
                        label='Thu' checked={Thu} onChange={setThu}/>
                    <CheckBox size={14} outline_color={theme.color.secondary} 
                        label='Fri' checked={Fri} onChange={setFri}/>
                    <CheckBox size={14} outline_color={theme.color.secondary} 
                        label='Sat' checked={Sat} onChange={setSat}/>
                    <CheckBox size={14} outline_color={theme.color.secondary} 
                        label='Sun' checked={Sun} onChange={setSun}/>
                </View>
                <Text style={[styles.headerText,theme.style.textFont]}>Set Location</Text>
            </View>
            <GooglePlacesAutocomplete
                textInputProps={{
                    InputComp: TextInput,
                    underlineColor: theme.color.secondary,
                    style: {width: '95%', backgroundColor: 'transparent'},
                    theme: theme.textInput,
                    label: 'Address'
                }}
                
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                }}
                query={{
                    key: Api.google_api_key,
                    language: 'en',
                }}
                styles={search_input_style}
            />
            <Text style={[styles.headerText,theme.style.textFont, styles.gameDetailText]}>Game Details</Text>
            <View style={styles.infoRow}>
                <Text style={[styles.text,theme.style.subtextFont, styles.gameDetailText]}>No. Teams: </Text>
                <TextInput style={styles.input} 
                    placeholder="2"
                    value={numTeamsString}
                    onChangeText={onSetNumTeams}
                    underlineColor={theme.color.secondary}
                    placeholderTextColor={theme.color.gray}
                    maxLength={2}
                    theme={{ 
                        colors: {
                            primary: theme.color.secondary,
                            text: theme.color.white, 
                            background: theme.color.secondary
                        }}}
                    />
            </View>
            <View style={styles.infoRow}>
                <Text style={[styles.text,theme.style.subtextFont, styles.gameDetailText]}>Size: </Text>
                <StoreInput textStyle={styles.input} maxLength={2} placeholder="Min" field={field.MIN_GAME_SIZE}/>
                <StoreInput textStyle={styles.input} maxLength={2} placeholder="Max" field={field.MAX_GAME_SIZE}/>

            </View>
            <View style={styles.infoRow}>
                <Text style={[styles.text,theme.style.subtextFont, styles.gameDetailText]}>Type: </Text>
                <StoreInput textStyle={styles.input} maxLength={2} placeholder="11" field={field.TEAM_SIZE_1}/>
                <Text style={[styles.text,theme.style.subtextFont, styles.gameDetailText]}>vs  </Text>
                <StoreInput textStyle={styles.input} maxLength={2} placeholder="11" field={field.TEAM_SIZE_2}/>
            </View>
            <View style={styles.gameCheckBoxes}>
                <Text style={[styles.text,theme.style.subtextFont, styles.gameDetailText]}>Shoes:</Text>
                <CheckBox containerStyle={styles.checkBox} size={16} outline_color={theme.color.secondary} 
                            label='Cleats' checked={cleatsRequired} onChange={setCleatsRequired}/>
                <CheckBox containerStyle={styles.checkBox} size={16} outline_color={theme.color.secondary} 
                            label='Turf Shoes' checked={turfShoesRequired} onChange={setTurfShoesRequired}/>
            </View>
            <View style={styles.gameCheckBoxes}>
                <Text style={[styles.text,theme.style.subtextFont, styles.gameDetailText]}>Field:</Text>
                <CheckBox containerStyle={styles.checkBox} size={16} outline_color={theme.color.secondary} 
                            label='Grass' checked={pitchType} onChange={() => setPitchType(true)}/>
                <CheckBox containerStyle={styles.checkBox} size={16} outline_color={theme.color.secondary} 
                            label='Turf' checked={!pitchType} onChange={() => setPitchType(false)}/>
            </View>
            <DatePicker
                style={{flex:1}}
                modal
                open={open}
                date={date}
                onConfirm={(date) => {
                setOpen(false)
                setDate(date)
                }}
                onCancel={() => {
                setOpen(false)
                }}
            />
            <ScrollView>
                {mapNumTeamColors(numTeams)}
            </ScrollView>
            <View style={styles.buttons}>
            <NavigationButton 
                containerStyle={{paddingTop: 5, alignSelf: 'center', width: '50%'}}
                buttonStyle={{height: 35}}
                func={createGame}
                navigation={props.navigation}
                buttonName='Create'
                nextScreen='Home'
            />
            <NavigationButton 
                containerStyle={{paddingTop: 5, alignSelf: 'center', width: '50%'}}
                buttonStyle={{height: 35}}
                func={createGame}
                navigation={props.navigation}
                buttonName='Reset Settings'
            />
            </View>

        </View>
    );
};

const search_input_style = {
    container:{
        flex: 0,
        alignItems: 'center'
    }
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }, 
    checkBox: {
        paddingRight: 20
    },
    gameDetailText: {
        paddingRight: 10
    },
    checkBoxes: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 15
    },
    gameCheckBoxes: {
        paddingLeft: 15,
        flexDirection: 'row',
        paddingTop: 15
    },
    infoRow: {
        flexDirection: 'row',
        paddingBottom: 5,
        paddingLeft: 15,
        alignItems: 'flex-end',
    },
    input: {
        height: 20,
        fontSize: 16,
        backgroundColor: 'transparent',
        paddingTop: 10,
        marginRight: 10,
    },
    date: {
        flexDirection:'row',
        alignItems: 'center',
    },
    container: {
        flex: 1,
    },
    headerText: {
        paddingTop: 15,
        fontSize: 20,
        color: theme.color.secondary
    },
    text: {
        fontSize: 16,
        color: theme.color.white,
    }
});

export default CreateGameScreen;
import React, { useState } from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import { ExpandableListView } from 'react-native-expandable-listview';
import Colors from '../themes/Colors';

const RowDivider = ({numberDividers}) => {
    var numbersList = []
    for (let i = 0; i < numberDividers; i++){
        numbersList[i] = i
    }
    const dividers = () => {
        return numbersList.map((number) => {
            return (
                <View key={number} style={{flex: 1, borderBottomWidth: 0.5, marginLeft: 10, marginRight: 10}}/>
            )
        })
    }
    return (
        <View style={{flexDirection: 'row', justifyContent:'center', alignContent:'center'}}>
            {dividers()}
        </View>
    )
}

const Row = ({rowContents, textAlginment='center', fontWeight='normal'}, key) => {
    const rows = (rowContents, textAlginment, fontWeight, key) => {
        return rowContents.map((column) => {
            return (
                <Text key={column} style={{flex: 1, textAlign: textAlginment, fontWeight: fontWeight}}>{column}</Text>
            )
        })
    }
    return (
        <View key={key}>
            <View style={{flexDirection: 'row', justifyContent:'center', alignContent:'center'}}>
                {rows(rowContents, textAlginment, fontWeight, key)}
            </View>
            <RowDivider numberDividers={rowContents.length} />
        </View>
    )
}

const UpcomingGameBox = React.memo(({func, ...rest}) => {
    const handleItemClick = ({index}) => {
        console.log(index);
    };

    const handleInnerItemClick = ({innerIndex, item, itemIndex}) => {
        console.log(innerIndex);
    };
    const mapTeams = (firstTeam, secondTeam) => {
        console.log("CALLING MAP TEAMS")
        var coupledRows = []
        for (let i = 0; i < firstTeam.length; i++) {
            coupledRows[i] = [firstTeam[i], ""]
        }
        for (let i = 0; i < secondTeam.length; i++) {
            if (coupledRows[i] != null) {
                coupledRows[i][1] = secondTeam[i]
            } else {
                coupledRows[i] = ["", secondTeam[i]]
            }
        }
        let i = 0
        return coupledRows.map((rowValues) => {
            i+=1
            return Row({rowContents: rowValues, textAlginment: 'center'}, key=i)
        })
    }
    
    const CONTENT = [
        {
            id: '1',
            categoryName: 'Upcoming Game',
            customItem: (
                <View style={{width: '100%'}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{flex: 1}}>Stony Brook, NY</Text>
                        <Text style={{flex: 1, textAlign:'right'}}>13/16</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{flex: 1}}>8/21/21 8:00PM</Text>
                        <Text style={{flex: 1, textAlign: 'right'}}>8 vs 8</Text>
                    </View>
                </View>
            ),
            subCategory: [
                {
                    customInnerItem: (
                        <View>
                            <Text>Weather: Sunny</Text>
                            <Text>Cleats: Yes</Text>
                            <Text style={{marginTop:20, textAlign: 'center', fontWeight:'bold'}}>Teams</Text>
                            <Row rowContents={['Red', 'Blue']} fontWeight='bold'/>
                            {mapTeams(['Timothy Thomas', 'Jeff Greg', 'Billy Bob', 'Ben Stevens', 'Don Tran', 'Maggie Li', 'Jacob Hans', 'Jake George'], 
                                                ['Wei Wang', 'Jason Guo', 'Evan Teow', 'Eddie Han', 'Ouutong Phooprasert'])}
                        </View>
                    )
                }
            ]
        }
    ]
    return (
        <ExpandableListView
            ExpandableListViewStyles={styles.container}
            itemContainerStyle={styles.innerContainer}
            innerItemContainerStyle={styles.dropDown}
            data={CONTENT}
            onInnerItemClick={handleInnerItemClick}
            onItemClick={handleItemClick}
        />
    );
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.SECONDARYL, 
        width: '90%', 
        zIndex: 1, 
        position: 'absolute',
        borderRadius: 10,
        alignSelf: 'center'
        
    },
    innerContainer: {
        backgroundColor: Colors.SECONDARYL, 
        borderRadius: 10
    },
    dropDown: {
        backgroundColor: Colors.SECONDARYL, 
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingBottom: 10
    },
    dateText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 9

    },
    border: {
        borderWidth: 1,
        width: 25,
        height: 20,
        margin: 2,
        marginVertical: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default UpcomingGameBox;
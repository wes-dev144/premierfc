import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch,
    List
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const DrawerClubProfile = (props) => {
    const [expanded, setExpanded] = useState(true);
    const handlePress = () => setExpanded(!expanded);
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Text 
                                label="CN"
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>Club Name</Title>
                                <Caption style={styles.caption}>@Location</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>50</Paragraph>
                                <Caption style={styles.caption}>Members</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>10</Paragraph>
                                <Caption style={styles.caption}>Upcoming Games</Caption>
                            </View>
                        </View>
                    </View>
                </View>
                <List.Section>
                    <List.Accordion
                        title="Members">
                        <List.Item title="First item" />
                        <List.Item title="Second item" />
                    </List.Accordion>

                    <List.Accordion
                        title="Pinned"
                        expanded={expanded}
                        onPress={handlePress}>
                        <List.Item title="First item" />
                        <List.Item title="Second item" />
                    </List.Accordion>
                </List.Section>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="cog" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Settings"
                        />
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 15,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    text: {
        fontSize: 18,
        textAlignVertical: 'center',
        paddingHorizontal: 5,
        fontWeight: "bold"
        },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        borderTopColor: '#f4f4f4',
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    options: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 15,
        alignItems: "center",
        borderBottomWidth: 0,
        paddingVertical: 10
        },
    });

export default DrawerClubProfile;
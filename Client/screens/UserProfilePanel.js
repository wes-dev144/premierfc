import React from 'react';
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
    Switch
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { auth } from '../api/firebase';

const SignOut = (props) => {
    auth.signOut()
  }
const DrawerUserProfile = (props) => {
    const paperTheme = useTheme()
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Text 
                                label="NM"
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>Name</Title>
                                <Caption style={styles.caption}>@Location</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>50</Paragraph>
                                <Caption style={styles.caption}>Friends</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>3</Paragraph>
                                <Caption style={styles.caption}>Clubs</Caption>
                            </View>
                        </View>
                    </View>
                </View>
                <Drawer.Section style={{borderBottomWidth: 0, borderColor: "#FFFFFF"}} title="Player Options">
                    <TouchableRipple>
                        <View style={styles.options}>
                            <Icon 
                                    name='account-cog'
                                    size={16}
                                    color="#707070"
                            />
                            <Text style={styles.text}>Edit Profile</Text>
                        </View>
                    </TouchableRipple>
                </Drawer.Section>
                <Drawer.Section style={{elevation: 0, borderBottomWidth: 0}} title="Organizer Options">
                    <TouchableRipple onPress={() => {console.log('pressed')}}>
                        <View style={styles.options}>
                            <Icon 
                                    name='plus-box-outline'
                                    size={16}
                                    color="#707070"
                            />
                            <Text style={styles.text}>Create Game</Text>
                        </View>
                    </TouchableRipple>
                </Drawer.Section>
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
                    <Drawer.Item
                        icon={({color, size}) => (
                            <Icon 
                                name='exit-to-app'
                                color={color}
                                size={size}
                            />
                        )}
                        label="Sign Out"
                        onPress={() => {SignOut()}}
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
        fontSize: 14,
        textAlignVertical: 'center',
        paddingHorizontal: 5
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
        paddingHorizontal: 25,
        alignItems: "center",
        borderBottomWidth: 0
      },
  });

export default DrawerUserProfile;
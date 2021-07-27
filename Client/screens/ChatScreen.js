// @refresh reset
import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import key from "../constants/StoreKeys";
import lightTheme from '../themes/LightTheme';
import NavigationButton from '../components/NavigationButton';
import { db, auth } from '../api/firebase';
import userInfoStore from '../stores/UserInfoStore';

const SignOff = (props) => {
  auth.signOut()
}

const ChatScreen = ({navigation}) => {
  const uid = userInfoStore.getData(key.UID)
  const name = userInfoStore.getData(key.NAME)
  const user = {_id: uid, name: name}
  const [messages, setMessages] = useState([])
  const chatsRef = db.collection('messages')
  console.log(userInfoStore.getData('dob'))

  useEffect(() => {
    const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
        const messagesFirestore = querySnapshot
            .docChanges()
            .filter(({ type }) => type === 'added')
            .map(({ doc }) => {
                const message = doc.data()
                return { ...message, createdAt: message.createdAt.toDate() }
            })
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        console.log("New Message:", messagesFirestore)
        appendMessages(messagesFirestore)
    })
    return () => unsubscribe()
  }, [])

  const appendMessages = useCallback(
    (messages) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
    },
    [messages]
  )
  
  async function handleSend(messages) {
    const writes = messages.map((m) => chatsRef.add(m))
    await Promise.all(writes)
  }

  return (
    <View style={[{flex: 1}, lightTheme.background]}>
        <NavigationButton func={SignOff} navigation={navigation} nextScreen='Login' buttonName='Log Out'/>
        <GiftedChat messages={messages} user={user} onSend={handleSend}/>
    </View>
)};

export default ChatScreen;
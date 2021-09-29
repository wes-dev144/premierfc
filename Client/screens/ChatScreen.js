// @refresh reset
import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

import lightTheme from '../themes/LightTheme';
import NavigationButton from '../components/NavigationButton';
import RequestStore from '../stores/RequestsStore';
import event from '../constants/Events';
import { db } from '../api/firebase';
import UserStore from '../stores/UserStore';
import UpcomingGameBox from '../components/UpcomingGameBox';

const ChatScreen = ({navigation}) => {
  const uid = UserStore.getUID()
  const name = UserStore.getName()
  const user = {_id: uid, name: name}
  const [messages, setMessages] = useState([])
  const [chatsRef, setChat] = useState(null)

  const onChange = () => {
    data = RequestStore.getData(event.GET_CLUB_INFO)
    console.log('THIS DATA', data)
    id = data.club_id
    console.log('updating id', id)
    setChat(db.collection(id))
  }

  useEffect(() => {
    console.log('IN HERE')
    if (chatsRef !== null){
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
    }
  }, [])

  useEffect(() => {
    RequestStore.addListener(onChange, event.GET_CLUB_INFO);
    return () => RequestStore.removeListener(onChange, event.GET_CLUB_INFO);
  }, []);

  const appendMessages = useCallback(
    (messages) => {
        console.log(messages)
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
        <UpcomingGameBox />
        <GiftedChat messages={messages} user={user} onSend={handleSend}/>
    </View>
)};

export default ChatScreen;
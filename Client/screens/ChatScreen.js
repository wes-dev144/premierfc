// @refresh reset
import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
// import { GiftedChat } from 'react-native-gifted-chat';

import lightTheme from '../themes/LightTheme';
import RequestStore from '../stores/RequestsStore';
import event from '../constants/Events';
import { db } from '../api/firebase';

import UpcomingGameBox from '../components/UpcomingGameBox';

const ChatScreen = ({navigation}) => {
  const user_info = RequestStore.getData(event.REQ_USER_DATA)
  const uid = user_info.uid
  const name = user_info.name
  const user = {_id: uid, name: name}
  const [messages, setMessages] = useState([])
  const [chatsRef, setChat] = useState(null)

  const onChange = () => {
    const club_info = RequestStore.getData(event.REQ_CLUB_INFO)
    console.log('updating id', club_info.club_id)
    setChat(db.collection('messages'))
    // setChat(db.collection(club_info.club_id))
  }

  useEffect(() => {
    RequestStore.subscribe(onChange, event.REQ_CLUB_INFO);
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
      return (chatsRef) => {
        unsubscribe()
        RequestStore.unsubscribe(onChange, event.REQ_CLUB_INFO); 
      }
    }
  }, [chatsRef])

  // useEffect(() => {
    
  // }, []);

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
        {/* <GiftedChat messages={messages} user={user} onSend={handleSend}/> */}
    </View>
)};

export default ChatScreen;
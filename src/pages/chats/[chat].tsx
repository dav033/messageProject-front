import BaseRoom from '@components/baseRoom/baseRoom'
import { getOtherUserByChatId, setMessagesReadedChat } from '../../petitions'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import style from '../../styles/ChatsDashboard.module.scss'
import { useStore } from '@hooks/useStore'
import { useCurrentChat } from '@hooks/useCurrentChat'
import { useMounted } from '@hooks/useMounted'

function PrivateChat () {
  const router = useRouter()

  const { hasMounted } = useMounted()

  const { getRoomData } = useStore()

  const {
    user,
    isLogged,
    currentChat,
    setCurrentChat,
    getMessagesChat,
    messagesChat
  } = useStore()

  const [otherUser, setOtherUser] = useState()

  useCurrentChat(router, router.query.chat, hasMounted)

  const getData = async () => {
    const chat = router.query.chat.toString()

    getRoomData(roter.query.chat.toString())
    const responseUser = await getOtherUserByChatId(chat, user.id)

    setOtherUser(responseUser)
  }

  async function enterSetMessagesReaded () {
    const response = await setMessagesReadedChat(router.query.chat, user.id)
    console.log(response)
    return response
  }
  useEffect(() => {
    if (router.query.chat) {
      getData()
      enterSetMessagesReaded()
      getMessagesChat(router.query.chat.toString())
      if (document.getElementById(currentChat)) {
        document.getElementById(currentChat).classList.remove(style.hola)
      }

      if (document.getElementById(router.query.chat.toString())) {
        document
          .getElementById(router.query.chat.toString())
          .classList.add(style.hola)
        setCurrentChat(router.query.chat.toString())
      }
      // getData()
    }
  }, [router.query.chat])

  return isLogged(user) && router.query.chat && hasMounted
    ? (
    <BaseRoom
      context="privateChat"
      messages={messagesChat}
      roomId={router.query.chat.toString()}
      receiver={otherUser}
      roomData={messagesChat}
    />
      )
    : null
}

export default React.memo(PrivateChat)

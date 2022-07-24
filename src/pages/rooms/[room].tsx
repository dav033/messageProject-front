import React, { useEffect } from 'react'

import BaseRoom from '@components/baseRoom/baseRoom'
import { useRouter } from 'next/router'
import { useMessages, useUser } from 'src/stores'
import style from '../../styles/ChatsDashboard.module.scss'
import axios from 'axios'
import { basePath } from '@helpers/basePath'
import { useCurrentChat } from '@hooks/useCurrentChat'
import { setMessagesReaded } from 'src/petitions'
function Room () {
  const router = useRouter()

  const messagesRoom = useMessages(
    (state: { messagesRoom }) => state.messagesRoom
  )

  const getMessagesRoom = useMessages(
    (state: { getMessagesRoom }) => state.getMessagesRoom
  )

  const currentChat = useMessages((state: { currentChat }) => state.currentChat)

  const setCurrentChat = useMessages(
    (state: { setCurrentChat }) => state.setCurrentChat
  )

  const user = useUser((state: { user }) => state.user)

  useCurrentChat(router)
  async function prueba () {
    const response = await setMessagesReaded(router.query.room, user.id)
    console.log(response)
    return response
  }
  useEffect(() => {
    if (router.query.room) {
      prueba()

      console.log(status)
      getMessagesRoom(router.query.room.toString())

      if (document.getElementById(currentChat)) {
        document.getElementById(currentChat).classList.remove(style.hola)
      }
      if (document.getElementById(router.query.room.toString())) {
        document
          .getElementById(router.query.room.toString())
          .classList.add(style.hola)
        setCurrentChat(router.query.room.toString())
      }
    }
  }, [router.query.room])

  return router.query.room
    ? (
    <BaseRoom
      messages={messagesRoom}
      roomId={router.query.room.toString()}
      context="room"
    />
      )
    : null
}

export default React.memo(Room)

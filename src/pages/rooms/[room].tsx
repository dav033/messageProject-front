import React, { useEffect } from 'react'

import BaseRoom from '@components/baseRoom/baseRoom'
import { useRouter } from 'next/router'
import style from '../../styles/ChatsDashboard.module.scss'
import { useCurrentChat } from '@hooks/useCurrentChat'
import { setMessagesReaded } from 'src/petitions'
import { useStore } from '@hooks/useStore'
import { useMounted } from '@hooks/useMounted'
function Room () {
  const router = useRouter()
  const { hasMounted } = useMounted()

  const { user, setCurrentChat, currentChat, getMessagesRoom, messagesRoom } =
    useStore()

  useCurrentChat(router)

  async function enterSetMessagesReaded () {
    const response = await setMessagesReaded(router.query.room, user.id)
    console.log(response)
    return response
  }
  useEffect(() => {
    if (router.query.room) {
      enterSetMessagesReaded()

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

  return router.query.room && hasMounted
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

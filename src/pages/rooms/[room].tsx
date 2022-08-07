import React, { useEffect } from 'react'

import BaseRoom from '@components/baseRoom/baseRoom'
import { useRouter } from 'next/router'
import { useCurrentChat } from '@hooks/useCurrentChat'
import { setMessagesReaded } from 'src/petitions'
import { useStore } from '@hooks/useStore'
import { useMounted } from '@hooks/useMounted'
import style from '../../styles/ChatsDashboard.module.scss'
function Room () {
  const router = useRouter()
  const { hasMounted } = useMounted()

  const { user, getMessagesRoom, messagesRoom, currentChat } = useStore()

  async function enterSetMessagesReaded () {
    const response = await setMessagesReaded(router.query.room, user.id)
    return response
  }
  useEffect(() => {
    if (router.query.room) {
      enterSetMessagesReaded()

      getMessagesRoom(router.query.room.toString())
    }
  }, [router])

  return router.query.room && hasMounted && messagesRoom
    ? (
    <BaseRoom
      messages={messagesRoom}
      roomId={router.query.room.toString()}
      context="room"
      roomData={messagesRoom}
    />
      )
    : null
}

export default React.memo(Room)

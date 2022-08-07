import React, { useEffect } from 'react'

import BaseRoom from '@components/baseRoom/baseRoom'
import { useRouter } from 'next/router'
import { setMessagesReaded } from 'src/petitions'
import { useStore } from '@hooks/useStore'
import { useMounted } from '@hooks/useMounted'

function Room () {
  const router = useRouter()
  const { hasMounted } = useMounted()

  const { user, getMessagesRoom, messagesRoom } = useStore()

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

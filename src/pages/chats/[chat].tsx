import BaseRoom from '@components/baseRoom/baseRoom'
import { getMessagesByChatId, getOtherUserByChatId } from '../../petitions'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useUser } from 'src/stores'

function PrivateChat () {
  const router = useRouter()
  const user = useUser((state: { user }) => state.user)
  const isLogged = useUser((state: { isLogged }) => state.isLogged)

  const [messages, setMessages] = useState()

  const [otherUser, setOtherUser] = useState()
  useEffect(() => {
    const getData = async () => {
      const chat = router.query.chat.toString()

      console.log(chat)
      const responseMessages = await getMessagesByChatId(router.query.chat)

      const responseUser = await getOtherUserByChatId(chat, user.id)

      setMessages(responseMessages)
      setOtherUser(responseUser)
    }

    if (router.query.chat) {
      getData()
    }
  }, [router.query.chat])

  return isLogged(user) && router.query.chat
    ? (
    <BaseRoom
      context="privateChat"
      messages={messages}
      roomId={router.query.chat.toString()}
      receiver={otherUser}
    />
      )
    : null
}

export default React.memo(PrivateChat)

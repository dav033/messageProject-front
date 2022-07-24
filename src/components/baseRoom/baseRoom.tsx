import React, { FormEvent, useEffect, useState, useCallback } from 'react'

import { getRoomById } from '../../petitions'
import { useShow } from '@hooks/useShow'
import { useMessages, useSocket, useUser } from 'src/stores'
import { Message } from '../../helpers/interfaces'
import BaseRoomView from './baseRoomView'
interface Props {
  messages?: Array<Message>
  roomId?: string
  context?: string
  receiver?: string
}
function BaseRoom (props: Props) {
  console.log('render')
  const { messages, roomId, context, receiver } = props
  const { open, close, show } = useShow()
  const [messagesState, setMessagesState] = useState<any>([])

  // const { receivingMessageRoom, setReceivingMessageRoom } = useSocket()

  const receivingMessageRoom = useSocket(
    (state: { receivingMessageRoom }) => state.receivingMessageRoom
  )

  const setReceivingMessageRoom = useSocket(
    (state: { setReceivingMessageRoom }) => state.setReceivingMessageRoom
  )

  useEffect(() => {
    setMessagesState(messages)
  }, [roomId, messages])

  interface Room {
    name: string
    image?: string
    creator: string
    users: string[]
    messages: string[]
    createdAt: Date
    type: string
  }

  const setMessageAux = useMessages(
    (state: { setMessageAux }) => state.setMessageAux
  )
  const [roomInfo, setRoomInfo] = useState<Room>()
  const user = useUser((state: { user }) => state.user)

  useEffect(() => {
    if (context === 'room') {
      const getRoom = async () => {
        const response = await getRoomById(roomId)
        setRoomInfo(response)
      }

      getRoom()
    }
  }, [roomId])

  useEffect(() => {
    if (receivingMessageRoom !== null) {
      if (receivingMessageRoom.room === roomId) {
        setMessagesState([...messagesState, receivingMessageRoom])
      }
    }

    setReceivingMessageRoom(null)

    // setReceivingMessage(null)
  }, [receivingMessageRoom])

  const handleSendMessage = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      console.time()
      e.preventDefault()
      const textArea = document.getElementById('message') as HTMLTextAreaElement
      const content = textArea.value
      textArea.value = ''
      document.getElementById('prueba').style.display = 'none'

      const time = new Date(Date.now()).toISOString()

      let messageObject: any = {}
      if (context === 'room') {
        messageObject = {
          type: 'text',
          content,
          transmitter: user.id,
          context,
          room: roomId,
          createdAt: time,
          toSend: true,
          receiver
        }

        setMessagesState([...messagesState, messageObject])
        setMessageAux(messageObject)
      } else if (context === 'provitionalChat') {
        messageObject = {
          type: 'text',
          content,
          transmitter: user.id,
          context,
          receiver,
          createdAt: time,
          toSend: true
        }
        console.log(messageObject)

        setMessagesState([messageObject])
      } else if (context === 'privateChat') {
        messageObject = {
          type: 'text',
          content,
          transmitter: user.id,
          receiver,
          context,
          room: roomId,
          createdAt: time,
          toSend: true
        }

        setMessagesState([...messagesState, messageObject])
        setMessageAux(messageObject)
      }
    },
    [messagesState]
  )

  return (
    <BaseRoomView
      context={context}
      roomInfo={roomInfo}
      handleSendMessage={handleSendMessage}
      messagesState={messagesState}
      modalOptions={{ show, close, open }}
    />
  )
}

export default React.memo(BaseRoom)

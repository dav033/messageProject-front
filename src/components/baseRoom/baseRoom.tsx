import React, { FormEvent, useEffect, useState, useCallback } from 'react'

import { getRoomById } from '../../petitions'
import { useShow } from '@hooks/useShow'
import { Message } from '../../helpers/interfaces'
import BaseRoomView from './baseRoomView'
import { useStore } from '@hooks/useStore'
interface Props {
  messages?: Array<Message>
  roomId?: string
  context?: string
  receiver?: string
}
function BaseRoom (props: Props) {
  const { messages, roomId, context, receiver } = props
  const { open, close, show } = useShow()
  const [messagesState, setMessagesState] = useState<any>([])

  // const { receivingMessageRoom, setReceivingMessageRoom } = useSocket()

  const { receivingMessageRoom, setReceivingMessageRoom, setMessageAux, user } =
    useStore()

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

  const [roomInfo, setRoomInfo] = useState<Room>()

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

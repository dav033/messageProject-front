import React, { FormEvent, useEffect, useState, useCallback } from 'react'

import { useShow } from '@hooks/useShow'
import { Message, Room } from '../../helpers/interfaces'
import BaseRoomView from './baseRoomView'
import { useStore } from '@hooks/useStore'
interface Props {
  messages?: Array<Message>
  roomId?: string
  context?: string
  receiver?: string
  roomData: Room
}
function BaseRoom (props: Props) {
  const { messages, roomId, context, receiver, roomData } = props
  const { open, close, show } = useShow()
  const [messagesState, setMessagesState] = useState<any>([])

  // const { receivingMessageRoom, setReceivingMessageRoom } = useSocket()

  const { receivingMessageRoom, setReceivingMessageRoom, setMessageAux, user } =
    useStore()

  useEffect(() => {
    setMessagesState(messages)
  }, [roomId, messages])

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
      roomData={roomData}
      handleSendMessage={handleSendMessage}
      messagesState={messagesState}
      modalOptions={{ show, close, open }}
    />
  )
}

export default React.memo(BaseRoom)

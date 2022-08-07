import style from '../styles/BaseRoom.module.scss'
import { transformDate } from '@helpers/transformDate'
import SentMessage from './sentMessage'
import Message from './message'

import React, { useEffect } from 'react'
import { useStore } from '@hooks/useStore'
interface Props {
  messages: Array<{
    type: string
    content: string
    createdAt: Date
    transmitter: string
    context: string
    room?: string
    _id?: string
    receiver?: string
    toSend?: boolean
  }>
}

function RenderMessages (props: Props) {
  const { user } = useStore()

  const { messages } = props

  console.log(messages)
  useEffect(() => {
    if (messages) {
      const element = document.getElementById('ewe')
      element.scrollTop = element.scrollHeight
    }
  }, [messages])

  let dateAux: string = ''

  return user
    ? (
    <div
      className={style.panelChat}
      style={{ backgroundColor: '', overflowX: 'hidden', height: '100%' }}
      id="ewe"
    >
      {messages
        ? (
            messages.map((message) => {
              const dateTransform = transformDate(message.createdAt)
              const { date, time } = dateTransform
              const dateAux2 = dateAux
              dateAux = date

              if (message.transmitter === user.id) {
                return (
              <SentMessage
                key={message._id ? message._id : message.createdAt.toString()}
                type="transmitter"
                propsObject={{
                  content: message.content,
                  time,
                  date,
                  dateAux2,
                  context: message.context,
                  roomId: message.room ? message.room : null,
                  receiver: message.receiver ? message.receiver : null,
                  transmitter: user.id,
                  toSend: message.toSend ? message.toSend : false
                }}
              />
                )
              } else {
                return (
              <Message
                key={message._id ? message._id : message.createdAt.toString()}
                content={message.content}
                type="receiver"
                time={time}
                date={date}
                dateAux2={dateAux2}
              />
                )
              }
            })
          )
        : (
        <div
          style={{ width: '100%', height: '100%', backgroundColor: 'yellow' }}
        >
          dasdsa
        </div>
          )}
    </div>
      )
    : null
}

export default React.memo(RenderMessages)

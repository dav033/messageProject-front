import style from '../styles/ChatsDashboard.module.scss'
import { useRouter } from 'next/router'
import React from 'react'
import MessageAlert from './messageAlert'
import { Message } from '@helpers/interfaces'
import { useIsMounted } from 'usehooks-ts'
import { useMounted } from '@hooks/useMounted'
import { useCurrentChat } from '@hooks/useCurrentChat'

interface PropsRoom {
  chat: {
    room: {
      _id: string
      createdAt: Date
      creator: string
      messages: string[]
      name: string
      type: string
      users: string[]
    }
    lastMessage: Message
    lengthMessages: number
    noReadedMessages: Message[]
  }
  RenderLastMessages: any
  renderDate: any
  userId: string
  privateChatInfo: {
    chatId: string
    userName: string
  }[]
}

interface PropsChat {
  chat: {
    room: {
      _id: string
      user1: string
      user2: string
      messages: string[]
    }
    lastMessage: Message
    lengthMessages: number
    noReadedMessages: Message[]
  }
  RenderLastMessages: any
  renderDate: any
  privateChatInfo: {
    chatId: string
    userName: string
  }[]
}

function RoomChatBox (props: PropsRoom & PropsChat) {
  const { chat, RenderLastMessages, renderDate, privateChatInfo } = props
  const router = useRouter()
  const { hasMounted } = useMounted()

  const type = chat.room.user1 ? router.query.chat : router.query.room
  useCurrentChat(router, type, hasMounted)

  function RenderChatName () {
    if (chat.room.type) {
      return chat.room.name
    } else {
      let aux = 'qq'

      privateChatInfo.forEach((privChat) => {
        if (privChat.chatId === chat.room._id) {
          aux = privChat.userName
        }
      })
      return aux
    }
  }

  return (
    <div
      className={style.friendDrawer}
      id={chat.room._id}
      onClick={() => {
        if (chat.room.type) {
          router.push({
            pathname: '/rooms/[room]',
            query: { room: chat.room._id }
          })
        } else {
          router.push({
            pathname: '/chats/[chat]',
            query: { chat: chat.room._id }
          })
        }
      }}
    >
      <MessageAlert noReadedMessages={chat.noReadedMessages} />
      <img
        className={style.profileImage}
        src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg"
        alt=""
      />
      <div className={style.text}>
        <h6>{RenderChatName()}</h6>
        <p className={'text-mute d'}> {RenderLastMessages(chat.lastMessage)}</p>
      </div>
      <span className={style.time}>{renderDate(chat)}</span>
    </div>
  )
}

export default React.memo(RoomChatBox)

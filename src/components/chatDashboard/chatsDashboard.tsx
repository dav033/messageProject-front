import React, { useEffect, useState } from 'react'
import {
  getUserById,
  getChatsByIdGroup,
  getPrivatesChatsByidGroup
} from '../../petitions'
import { transformDate } from '@helpers/transformDate'
import { ChatDashboardView } from './chatDashboardView'
import { Message, Room } from '@helpers/interfaces'
import { useStore } from '@hooks/useStore'

function ChatDashboard () {
  const {
    currentChat,
    isLogged,
    user,
    setMessageAux,
    messageAux,
    receivingMessageDashboard,
    setReceivingMessageDashboard
  } = useStore()

  const [chats, setChats] = useState([])
  const [privateChats, setPrivateChats] = useState([])

  const [privateChatsAux, setPrivateChatsAux] = useState<
    Array<{ chatId: string; userName: string }>
  >([])

  useEffect(() => {
    const getData = async () => {
      const responseChats = await getChatsByIdGroup(user.rooms, user.id)
      const responsePrivChat = await getPrivatesChatsByidGroup(
        user.privateChats,
        user.id
      )

      setPrivateChats(responsePrivChat)
      setChats(responseChats)
    }

    if (isLogged(user)) {
      getData()
    }
  }, [user])

  const [useAux, setUseAux] = useState<
    Array<{
      room: Room
      lastMessage: Message
      lenghtMessages: number
      noReadedMessages: string[]
    }>
  >([])

  useEffect(() => {
    // alert(0)
    useAux.forEach((chat) => {
      if (chat.room._id === currentChat) {
        console.log('asdosdads', chat.noReadedMessages)
        chat.noReadedMessages = []
      }
    })
  }, [currentChat])

  useEffect(() => {
    if (privateChats) {
      const prueba = async () => {
        const privateChatsUsersInfo = []

        privateChats.forEach(async (chat) => {
          let otherUser = ''
          if (chat.room.user1 === user.id) {
            otherUser = chat.room.user2
          } else {
            otherUser = chat.room.user1
          }

          const userInfo = await getUserById(otherUser)
          privateChatsUsersInfo.push({
            chatId: chat.room._id,
            userName: userInfo.userName
          })

          console.log(privateChatsUsersInfo)

          setPrivateChatsAux(privateChatsUsersInfo)
        })
      }

      prueba()
    }
  }, [privateChats, user])

  useEffect(() => {
    if (chats) {
      setUseAux(() => {
        let trueChats = []

        trueChats = chats.concat(privateChats)

        const chatsWhitMessages = []
        trueChats.forEach((chat) => {
          if (chat) {
            if (chat.lenghtMessages !== 0) {
              chatsWhitMessages.push(chat)
            }
          }
        })

        const chatsWhitoutMessages = []
        chats.forEach((chat) => {
          if (chat.lenghtMessages === 0) {
            chatsWhitoutMessages.push(chat)
          }
        })

        const Aux2 = chatsWhitMessages.concat(chatsWhitoutMessages)

        console.log(Aux2)
        return Aux2.sort((a, b) => {
          if (
            a.lastMessage !== null &&
            b.lastMessage !== null &&
            a.lastMessage !== undefined &&
            b.lastMessage !== undefined
          ) {
            const dateA: any = new Date(a.lastMessage.createdAt)
            const dateB: any = new Date(b.lastMessage.createdAt)
            return dateB - dateA
          } else {
            return null
          }
        })
      })
    }
  }, [user, privateChatsAux, chats])

  useEffect(() => {
    if (useAux) {
      if (messageAux !== null && messageAux !== undefined) {
        setUseAux(() => {
          let owo: any = ''
          if (messageAux !== null && messageAux !== undefined) {
            useAux.forEach((chat) => {
              if (chat.room._id === messageAux.room) {
                return (chat.lastMessage = messageAux)
              }
            })

            owo = useAux.find((chat) => chat.room._id === messageAux.room)

            const ewe = useAux.indexOf(owo)
            const mensajeEnviado = useAux[ewe]
            const aux = useAux.slice(0, ewe)
            const mama = useAux.slice()
            mama.splice(0, ewe + 1)
            aux.unshift(mensajeEnviado)
            mama.unshift(...aux)
            return mama
          }
        })
      }

      setMessageAux(null)
    }
  }, [messageAux])

  useEffect(() => {
    if (receivingMessageDashboard !== null) {
      useAux.forEach((chat) => {
        if (chat.room._id === receivingMessageDashboard.room) {
          console.log(chat)
          chat.lastMessage = receivingMessageDashboard
          console.log(chat)
        }
      })

      setUseAux(() => {
        let owo: any = ''
        owo = useAux.find(
          (chat) => chat.room._id === receivingMessageDashboard.room
        )

        const ewe = useAux.indexOf(owo)
        const mensajeEnviado = useAux[ewe]
        const aux = useAux.slice(0, ewe)
        const mama = useAux.slice()
        mama.splice(0, ewe + 1)
        aux.unshift(mensajeEnviado)
        mama.unshift(...aux)
        return mama
      })

      if (receivingMessageDashboard.room !== currentChat) {
        useAux.forEach((chat) => {
          if (chat.room._id === receivingMessageDashboard.room) {
            chat.noReadedMessages.push(receivingMessageDashboard.room)
          }
        })
      }
      setReceivingMessageDashboard(null)
    }
  }, [receivingMessageDashboard])

  useEffect(() => {
    console.log(useAux)
  }, [useAux])

  const RenderLastMessages = (lastMessage) => {
    if (lastMessage != null) {
      return lastMessage.content
    } else {
      return 'No hay mensajes'
    }
  }

  const renderDate = (data) => {
    if (data) {
      if (data.lastMessage != null) {
        const messageDate = data.lastMessage.createdAt
        const dateTransform = transformDate(messageDate)
        const { time } = dateTransform

        return time
      } else {
        return null
      }
    } else {
      return 'h2'
    }
  }

  const verify = () => {
    let owo = true
    useAux.forEach((chat) => {
      if (!chat) {
        owo = false
      }
    })

    return owo
  }

  if (isLogged(user)) {
    if (verify() === true) {
      return (
        <ChatDashboardView
          useAux={useAux}
          setUseAux={setUseAux}
          RenderLastMessages={RenderLastMessages}
          userId={user.id}
          privateChatInfo={privateChatsAux}
          renderDate={renderDate}
        />
      )
    } else {
      return <>No hay chats</>
    }
  } else {
    return <>no hay chatsaa</>
  }
}

export default React.memo(ChatDashboard)

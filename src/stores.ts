import { basePath } from '@helpers/basePath'
import axios from 'axios'
import create from 'zustand'
import {
  loginP,
  getUserById,
  getMessagesByRoomId,
  getMessagesByChatId
} from './petitions'
import socket from './socket'
import { persist } from 'zustand/middleware'
function userInit (args) {
  console.log(args)
  const { id, user, token, rooms, profileImage, privateChats } = args.user

  const socketId = ''
  socket.connect()
  socket.emit('conectado', id)

  const userObj = {
    id,
    userName: user,
    token,
    socketId,
    rooms,
    profileImage,
    privateChats
  }
  window.localStorage.setItem('token', token)
  window.localStorage.setItem('user', JSON.stringify(userObj))

  if (rooms) {
    rooms.forEach((room) => socket.emit('joinRoom', room))
  }

  if (privateChats) {
    privateChats.forEach((chat) => socket.emit('joinRoom', chat))
  }
  return userObj
}

export const useUser = create(
  persist(
    (set, get) => ({
      user: null,

      revalidate: async (id) => {
        console.log('AAAA', id)
        const response = await getUserById(id)

        set({
          user: {
            id: response._id,
            privateChats: response.privateChats,
            profileImage: response.profileImage,
            rooms: response.rooms,
            userName: response.userName
          }
        })
      },

      login: async (
        userCredentialsUserName: string,
        usersCredentialsPassword: string
      ) => {
        const response = await loginP({
          userName: userCredentialsUserName,
          password: usersCredentialsPassword
        })

        if (response.message === 'Usuario autenticado') {
          set({ user: userInit(response) })
        } else {
          alert('tas mal pa')
        }
      },

      register: async (props) => {
        const response = await axios.post(`${basePath}users/register`, props)
        console.log(response)
        const functionArgs = {
          message: response.data.message,
          id: response.data.id,
          user: response.data.user,
          token: response.data.token
        }

        if (response.data.message === 'Usuario registrado') {
          set({ user: userInit(functionArgs) })
        } else if (response.data.message === 'Usuario ya existe') {
          alert('Este usuario ya existe')
        } else if (
          response.data.message === 'Por favor llene todos los campos'
        ) {
          alert('Por favor llene todos los campos')
        }
      },

      logout: () => {
        set({ user: null })
        socket.disconnect()
        socket.emit('desconectado')
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('user')
      },

      isLogged: (user) => !!user
    }),
    {
      name: 'user-storage',
      getStorage: () => sessionStorage
    }
  )
)

export const useMessages = create((set, get) => ({
  messagessRoom: [],
  messageAux: {},
  messagesChat: [],
  currentChat: '',
  getMessagesRoom: async (id) => {
    const response = await getMessagesByRoomId(id)
    set({ messagesRoom: response })
  },
  getMessagesChat: async (id) => {
    const response = await getMessagesByChatId(id)
    set({ messagesChat: response })
  },
  setMessageAux: (message) => set(() => ({ messageAux: message })),
  setCurrentChat: (chat) => set(() => ({ currentChat: chat }))
}))

export const useSocket = create(
  persist(
    (set, get) => ({
      receivingMessageRoom: {},
      receivingMessageDashboard: {},
      socketId: '',
      usersList: [],
      setReceivingMessageDashboard: (message) =>
        set({ receivingMessageDashboard: message }),
      setReceivingMessageRoom: (message) =>
        set({ receivingMessageRoom: message }),
      setSocketId: (socketId) => set({ socketId }),
      setUsersList: (usersList) => set({ usersList })
    }),
    {
      name: 'socket-storage',
      getStorage: () => sessionStorage
    }
  )
)

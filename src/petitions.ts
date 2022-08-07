import axios from 'axios'
// import socket from './socket'
import { basePath } from '@helpers/basePath'
// gets
export const getUserById = async (id: string) => {
  const response = await axios.get(`${basePath}users/${id}`)
  return response.data.user
}

export const getRoomById = async (id: string) => {
  const response = await axios.get(`${basePath}room/${id}`)
  return response.data
}

export const getChatsByIdGroup = async (idGroup, userId) => {
  const response = await axios.post(`${basePath}room/groupId/`, {
    idGroup,
    userId
  })
  return response.data
}

export const getPrivatesChatsByidGroup = async (idGroup, userId) => {
  const response = await axios.post(`${basePath}private-chat/groupId`, {
    idGroup,
    userId
  })
  return response.data
}

export const getRooms = async () => {
  const response = await axios.get(`${basePath}room/`)
  return response.data
}

export const verifyToken = async (token) => {
  const response = await axios.post(
    `${basePath}users/token`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  return response.data
}

export const getMessagesByRoomId = async (idRoom) => {
  const response = await axios.get(`${basePath}messages/${idRoom}`)
  return response.data
}

export const getLastMessagesAndRoomIdByRoomsIds = async (
  idsRooms: string[]
) => {
  const response = await axios.post(`${basePath}messages/lastMessages`, {
    roomsIds: idsRooms
  })
  return response.data
}

export const getRoomsLessTheUserRooms = async (idUser) => {
  const response = await axios.post(`${basePath}room/user`, {
    idUser
  })
  return response.data
}

export const createRoom = async (room) => {
  const response = await axios.post(`${basePath}room/`, { room })
  return response.data
}

export const getUser = async () => {
  const token = localStorage.getItem('token')
  const response = await axios.post(
    `${basePath}users/token`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  return response.data.user
}

export const loginP = async (user) => {
  const response = await axios.post(`${basePath}users/login`, user, {
    headers: { 'Access-Control-Allow-Origin': '*' }
  })
  return response.data
}

export const sendMessage = async (message) => {
  const response = await axios.post(`${basePath}messages/`, message)
  return response.data
}

export const subscribeToRoom = async (props) => {
  const { idRoom, idUser } = props
  const response = await axios.post(`${basePath}users/${idUser}/subscribe`, {
    roomId: idRoom
  })
  return response.data
}

export const addMessage = async (props) => {
  const { idRoom, message } = props
  const response = await axios.put(`${basePath}room/${idRoom}`, {
    message
  })
  return response.data
}

export const getUsersLessOne = async (idUser) => {
  const response = await axios.get(`${basePath}users/allUsers/${idUser}`)
  return response.data
}

export const getMessagesByChatId = async (chatId) => {
  const response = await axios.get(`${basePath}messages/chat/${chatId}`)

  return response.data
}

export const getPrivateChat = async (idChat) => {
  const response = await axios.get(`${basePath}private-chat/` + idChat)
  return response.data
}

export const uploadProfileImage = async (idUser, imageData) => {
  const formData = new FormData()
  formData.append('file', imageData)
  const response = await axios.post(
    `${basePath}users/${idUser}/image`,
    formData
  )

  return response.data
}

export const revalidateUserData = async (idUser) => {
  const response = await axios.get(`${basePath}users/revalidate/${idUser}`)

  return response.data
}

export const createPrivateChat = async (data) => {
  const response = await axios.post(`${basePath}private-chat`)

  return response.data
}

export const getOtherUserByChatId = async (chatId, id) => {
  const response = await axios.post(`${basePath}private-chat/otherUser/${id}`, {
    chatId
  })

  return response.data
}

export const setMessagesReaded = async (roomId, userId) => {
  const response = await axios.post(`${basePath}room/updateUsersRead`, {
    roomId,
    userId
  })

  return response
}

export const setMessagesReadedChat = async (roomId, userId) => {
  const response = await axios.post(`${basePath}room/updateUsersRead`, {
    roomId,
    userId
  })

  return response.data
}

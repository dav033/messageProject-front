import { useMessages, useSocket, useUser } from 'src/stores'

export const useStore = () => {
  const user = useUser((state: { user }) => state.user)

  const revalidate = useUser((state: { revalidate }) => state.revalidate)

  const login = useUser((state: { login }) => state.login)

  const register = useUser((state: { register }) => state.register)

  const logout = useUser((state: { logout }) => state.logout)

  const isLogged = useUser((state: { isLogged }) => state.isLogged)

  const messagesRoom = useMessages(
    (state: { messagesRoom }) => state.messagesRoom
  )

  const messageAux = useMessages((state: { messageAux }) => state.messageAux)

  const setMessageAux = useMessages(
    (state: { setMessageAux }) => state.setMessageAux
  )

  const currentChat = useMessages((state: { currentChat }) => state.currentChat)

  const setCurrentChat = useMessages(
    (state: { setCurrentChat }) => state.setCurrentChat
  )

  const setReceivingMessageRoom = useSocket(
    (state: { setReceivingMessageRoom }) => state.setReceivingMessageRoom
  )

  const receivingMessageRoom = useSocket(
    (state: { receivingMessageRoom }) => state.receivingMessageRoom
  )

  const receivingMessageDashboard = useSocket(
    (state: { receivingMessageDashboard }) => state.receivingMessageDashboard
  )

  const socketId = useSocket((state: { socketId }) => state.socketId)

  const usersList = useSocket((state: { usersList }) => state.usersList)

  const setReceivingMessageDashboard = useSocket(
    (state: { setReceivingMessageDashboard }) =>
      state.setReceivingMessageDashboard
  )

  const setSocketId = useSocket((state: { setSocketId }) => state.setSocketId)

  const setUsersList = useSocket(
    (state: { setUsersList }) => state.setUsersList
  )

  const getMessagesRoom = useMessages(
    (state: { getMessagesRoom }) => state.getMessagesRoom
  )

  const getMessagesChat = useMessages(
    (state: { getMessagesChat }) => state.getMessagesChat
  )

  const messagesChat = useMessages(
    (state: { messagesChat }) => state.messagesChat
  )

  return {
    user,
    revalidate,
    login,
    register,
    logout,
    isLogged,
    messagesRoom,
    messageAux,
    setReceivingMessageDashboard,
    setSocketId,
    setUsersList,
    usersList,
    socketId,
    receivingMessageDashboard,
    setReceivingMessageRoom,
    currentChat,
    setCurrentChat,
    setMessageAux,
    receivingMessageRoom,
    getMessagesRoom,
    getMessagesChat,
    messagesChat
  }
}

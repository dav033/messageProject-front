import socket from '../../socket'
import React, { createContext, useEffect } from 'react'
import { useSocket, useUser } from 'src/stores'
export const SocketContext = createContext(null)

function SocketProvider ({ children }) {
  const setReceivingMessageRoom = useSocket(
    (state: { setReceivingMessageRoom }) => state.setReceivingMessageRoom
  )
  const user = useUser((state: { user }) => state.user)
  const isLogged = useUser((state: { isLogged }) => state.isLogged)
  const setReceivingMessageDashboard = useSocket(
    (state: { setReceivingMessageDashboard }) =>
      state.setReceivingMessageDashboard
  )

  const setSocketId = useSocket((state: { setSocketId }) => state.setSocketId)

  const setUsersList = useSocket(
    (state: { setUsersList }) => state.setUsersList
  )

  const revalidate = useUser((state: { revalidate }) => state.revalidate)

  socket.on('message', (message) => {
    if (isLogged(user)) {
      if (message.transmitter !== user.id) {
        console.log('transmitter:', message.transmitter, 'user:', user.id)

        // if (message.context === 'provitionalChat') {
        //   queryClient.invalidateQueries('messageaffect')
        // }

        setReceivingMessageRoom(message)
        setReceivingMessageDashboard(message)
      }
    }
  })

  socket.on('refresh', () => {
    revalidate(user.id)
  })

  socket.on('identifier', (socketid) => {
    setSocketId(socketid)
  })

  socket.on('usersList', (usersList) => {
    setUsersList(usersList)
  })

  useEffect(() => {
    if (user) {
      if (user.rooms) {
        user.rooms.forEach((room) => socket.emit('joinRoom', room))
      }

      user.privateChats.forEach((chat) => socket.emit('joinRoom', chat))
    } else {
      socket.disconnect()
    }
  }, [user])

  return (
    <SocketContext.Provider value={null}>{children}</SocketContext.Provider>
  )
}

export default React.memo(SocketProvider)

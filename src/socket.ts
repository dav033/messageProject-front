import io from 'socket.io-client'
const port = 'https://messageproject-back-production.up.railway.app:8080/'
// const portProduction = 'https://messagesgroup.herokuapp.com'
const socket = io(port, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: Infinity,
  transports: ['websocket']
})

export default socket

import io from 'socket.io-client'
const port = 'http://localhost:80'
// const portProduction = 'https://messagesgroup.herokuapp.com'
const socket = io(port, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: Infinity
  // transports: ['websocket']
})

export default socket

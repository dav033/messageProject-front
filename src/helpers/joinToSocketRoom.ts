import socket from '../socket'
export const joinToSocketRoom = (room: String) => {
  socket.emit('joinRoom', { room })
}

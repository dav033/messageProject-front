import { useContext } from 'react'
import { SocketContext } from './socketProvider'

function useSocket () {
  return useContext(SocketContext)
}

export default useSocket

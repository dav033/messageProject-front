import { useContext } from 'react'
import { SocketContext } from '../socketReceiver/socketProvider'

function useSocket (props) {
  return useContext(SocketContext)
}

export default useSocket

import { useEffect } from 'react'
import { useStore } from './useStore'

const useChatDashboardData = (roomId, userId) => {
  const { getChats } = useStore()

  useEffect(() => {
    getChats(roomId, userId)
  }, [])
}

export default useChatDashboardData

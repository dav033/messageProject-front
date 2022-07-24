import { useEffect } from 'react'
import { useMessages } from 'src/stores'
import style from '../styles/ChatsDashboard.module.scss'
export const useCurrentChat = (router) => {
  const setCurrentChat = useMessages(
    (state: { setCurrentChat }) => state.setCurrentChat
  )

  const currentChat = useMessages((state: { currentChat }) => state.currentChat)

  console.log('FUNCIONANDO')
  useEffect(() => {
    if (router.query.room || router.query.chat) {
      console.log('es un chat')
    } else {
      if (document.getElementById(currentChat)) {
        document.getElementById(currentChat).classList.remove(style.hola)
      }
      setCurrentChat(null)
      console.log('no es un chat')
    }
  }, [])
}

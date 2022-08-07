import { useEffect } from 'react'
import style from '../styles/ChatsDashboard.module.scss'
import { useStore } from './useStore'
export const useCurrentChat = (router, query, hasMounted) => {
  const { setCurrentChat, currentChat } = useStore()

  useEffect(() => {
    console.log('A')
    if (!(router.query.room || router.query.chat)) {
      if (document.getElementById(currentChat)) {
        document.getElementById(currentChat).classList.remove(style.hola)
      }
      setCurrentChat(null)
    }

    if (currentChat === query && document.getElementById(currentChat)) {
      document.getElementById(currentChat).classList.remove(style.hola)
    }
    if (document.getElementById(currentChat)) {
      document.getElementById(currentChat).classList.remove(style.hola)
    }

    if (document.getElementById(query)) {
      document.getElementById(query).classList.add(style.hola)
    } else {
      if (document.getElementById(currentChat)) {
        document.getElementById(currentChat).classList.add(style.hola)
      }
    }

    if (query !== null || query !== undefined) {
      setCurrentChat(query)
    }

    console.log(currentChat, query)
  }, [router, query, currentChat])

  useEffect(() => {
    console.log(hasMounted)
  }, [hasMounted])
}

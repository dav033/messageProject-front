import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useStore } from './useStore'

export const useRedirectPublic = () => {
  const { isLogged, user } = useStore()
  const router = useRouter()

  const redirect = () => {
    return !isLogged(user) ? null : router.push('/')
  }

  useEffect(() => {
    redirect()
  })
}

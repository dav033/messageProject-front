import { useRouter } from 'next/router'
// import styles from '../../styles/Login.module.scss'
// import Link from 'next/link'
import { useCurrentChat } from '@hooks/useCurrentChat'
import { useStore } from '@hooks/useStore'
import { useRedirectPublic } from '@hooks/useRedirectPublic'
import { FormEvent } from 'react'
import LoginView from './loginView'

interface FormData {
  user: HTMLInputElement
  password: HTMLInputElement
}
export default function Login () {
  useRedirectPublic()
  const router = useRouter()
  useCurrentChat(router)

  const { login } = useStore()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log(e)

    console.log(e.target)
    const { user, password } = e.target as typeof e.target & FormData

    login(user.value, password.value)
  }

  return <LoginView handleSubmit={handleSubmit} />
}

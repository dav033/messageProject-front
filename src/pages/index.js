// import Head from 'next/head'
// import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useUser } from '../stores'
export default function Home () {
  const user = useUser((state) => state.user)
  const logout = useUser((state) => state.logout)
  return (
    <>
      <div className={styles.container}>
        <button onClick={() => console.log(user)}>IsLogged</button>
        <button onClick={logout}>cerrar</button>
        <Link href="/login">
          <a>LOGIN</a>
        </Link>
      </div>
      s ;
    </>
  )
}

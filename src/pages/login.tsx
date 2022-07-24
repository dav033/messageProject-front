import { useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Login.module.scss'
import Link from 'next/link'
import { useUser } from 'src/stores'

export default function Login () {
  // const { login, user, isLogged } = useAuth()

  const router = useRouter()
  const login = useUser((state: { login: any }) => state.login)
  const user = useUser((state: { user }) => state.user)
  const isLogged = useUser((state: { isLogged }) => state.isLogged)
  useEffect(() => {
    const redirect = () => {
      return !isLogged(user) ? null : router.push('/')
    }

    redirect()
  }, [user])

  async function handleSubmit (e) {
    e.preventDefault()

    console.log(e.target.elements)
    const { user, password } = e.target.elements

    const userData = {
      userName: user.value,
      password: password.value
    }
    console.log(userData)

    login(user.value, password.value)
  }

  return (
    <div className={styles.home}>
      {/* <button onClick={() => router.push("/")}>AIUDAAAAA</button> */}
      <form className={styles.login} onSubmit={(e) => handleSubmit(e)}>
        <div
          className={styles.inputContainer}
          id="userContainer"
          style={{ backgroundColor: '' }}
        >
          <input
            type="text"
            placeholder=" "
            className={styles.loginInput}
            id="user"
            autoComplete="off"
          ></input>
          <label
            htmlFor="userInput"
            className={styles.loginLabel}
            style={{ backgroundColor: '' }}
          >
            Usuario
          </label>
        </div>

        <div
          className={styles.inputContainer}
          id="passworContainer"
          style={{ backgroundColor: '' }}
        >
          <input
            type="password"
            placeholder=" "
            className={styles.loginInput}
            id="password"
            autoComplete="off"
          />
          <label htmlFor="userInput" className={styles.loginLabel}>
            Contraseña
          </label>
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.submitInput}>
            Ingresar
          </button>
          <div className={styles.toRegister} style={{ backgroundColor: '' }}>
            <h5>¿No tienes cuenta?</h5>
            &nbsp;
            <Link href="/register">
              <a>Haz click aqui</a>
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

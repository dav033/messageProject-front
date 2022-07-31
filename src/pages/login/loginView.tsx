import styles from '../../styles/Login.module.scss'
import Link from 'next/link'
import { FormEvent } from 'react'
interface Props {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
}
export default function LoginView (props: Props) {
  const { handleSubmit } = props
  return (
    <div className={styles.home}>
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

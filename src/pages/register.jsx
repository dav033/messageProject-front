import Link from 'next/link'
import { revalidateUserData } from '../petitions'
import { useUser } from '../stores'
export default function Register () {
  const register = useUser((state) => state.register)

  const revalidate = useUser((state) => state.revalidate)
  async function handleSubmit (e) {
    e.preventDefault()
    const { user, email, password, confirmPassword } = e.target.elements
    const userData = {
      userName: user.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    }
    console.log(userData)

    register(userData)
    revalidate(user.id)
  }

  return (
    <div className="register">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="inputContainer" id="userContainer">
          <input
            type="text"
            placeholder=" "
            className="registerInput"
            id="user"
            autoComplete="off"
          />
          <label htmlFor="userInput" className="registerLabel">
            Usuario
          </label>
        </div>

        <div className="inputContainer" id="emailContainer">
          <input
            type="email"
            placeholder=" "
            className="registerInput"
            id="email"
            autoComplete="off"
          />
          <label htmlFor="userInput" className="registerLabel">
            Correo
          </label>
        </div>

        <div className="inputContainer" id="passwordContainer">
          <input
            type="password"
            placeholder=" "
            className="registerInput"
            id="password"
            autoComplete="off"
          />
          <label htmlFor="userInput" className="registerLabel">
            Contraseña
          </label>
        </div>

        <div className="inputContainer" id="confirmPasswordContainer">
          <input
            type="password"
            placeholder=" "
            className="registerInput"
            id="confirmPassword"
            autoComplete="off"
          />
          <label htmlFor="userInput" className="registerLabel">
            Confirmar contraseña
          </label>
        </div>

        <div className="buttonContainer">
          <button type="submit" className="submitInput">
            Ingresar
          </button>
          <div className="toRegister" style={{ backgroundColor: '' }}>
            <h5>¿Ya tienes cuenta?</h5>
            &nbsp;
            <Link href="/login ">
              <a>Haz click aqui</a>
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

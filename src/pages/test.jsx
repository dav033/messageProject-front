import axios from 'axios'

import { createRoom, uploadProfileImage } from '../petitions'

// import { basePath, joinToSocketRoom } from '../helpers'
import { basePath } from '@helpers/basePath'
import { useUser } from '../stores'
import { useState } from 'react'
import { useFile } from '@hooks/useFile'
import { useRouter } from 'next/router'
import { useCurrentChat } from '../hooks/useCurrentChat.tsx'

export default function Test () {
  const user = useUser((state) => state.user)
  const revalidate = useUser((state) => state.revalidate)
  // const { usersList } = useSocket()
  const router = useRouter()

  useCurrentChat(router)

  const owo = async () => {
    const token = localStorage.getItem('token')
    console.log(`${basePath}users/token`)
    const response = await axios.post(
      `${basePath}users/token`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    await console.log(response)
  }

  function prueba () {
    console.log(user)
  }

  function name () {
    console.log(user)
  }

  const sendRoom = async (e) => {
    e.preventDefault()
    const { nombreRoom, typeRoom } = e.target.elements

    await createRoom({
      name: nombreRoom.value,
      creator: user.id,
      type: typeRoom.value,
      users: [user.id]
    })

    nombreRoom.value = ''
    typeRoom.value = 'Publica'
    revalidate(user.id)
  }
  const [target, setTarget] = useState()
  const { file, fileUrl } = useFile(target)

  const onChangePrueba = (e) => {
    setTarget(e.target.files[0])
  }

  const enviarPrueba = async () => {
    uploadProfileImage(user.id, file)
  }

  return (
    <div className="home" style={{ flex: 4, backgroundColor: '' }}>
      <input type="file" onChange={(e) => onChangePrueba(e)}></input>
      <button onClick={() => enviarPrueba()}>enviar</button>
      <button onClick={(e) => prueba()}>usersList</button>
      <button onClick={(e) => owo()}>token</button>
      <button onClick={(e) => name()}>suario</button>
      <form onSubmit={(e) => sendRoom(e)}>
        <input type="text" placeholder="nombre" id="nombreRoom" input />
        <select id="typeRoom">
          <option value="Publica">Publica</option>
          <option value="Privada">Privada</option>
        </select>
        <button type="submit">crear sala</button>
      </form>

      <img src={fileUrl}></img>
    </div>
  )
}

import sockets from '../../socket'
import { useRouter } from 'next/router'
import { getRoomsLessTheUserRooms, subscribeToRoom } from '../../petitions'
import style from '../../styles/Rooms.module.scss'

import RoomListItem from '@components/roomListItem'
import { useEffect, useState } from 'react'
import { useStore } from '@hooks/useStore'
import { FaLock, FaUnlock } from 'react-icons/fa'
export default function Rooms () {
  const router = useRouter()

  const { revalidate, user, isLogged } = useStore()
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    if (user) {
      const getRooms = async () => {
        const response = await getRoomsLessTheUserRooms(user.id)
        setRooms(response)
      }

      getRooms()
    }
  }, [])

  const joinRoom = async (idRoom: string) => {
    const idUser = user.id
    const response = await subscribeToRoom({ idRoom, idUser })
    console.log(response.success)
    if (response) {
      revalidate(idUser)

      sockets.emit('joinRoom', idRoom)
      router.push({
        pathname: '/rooms/[room]',
        query: { room: idRoom }
      })
      revalidate(idUser)
    } else {
      revalidate(idUser)
      alert('No puedes entrar a esta sala')
    }
    revalidate(idUser)
  }

  const RenderIconPerType = (type) => {
    if (type === 'Publica') {
      return <FaUnlock />
    } else {
      return <FaLock />
    }
  }

  function Main () {
    return (
      <div className={style.room}>
        {rooms.map((room) => (
          <RoomListItem
            key={room._id}
            name={room.name}
            roomId={room._id}
            image={room.image}
            room={room}
            joinFunction={joinRoom}
            RenderIconPerType={RenderIconPerType}
          />
        ))}
      </div>
    )
  }

  return rooms && isLogged(user) && user != null
    ? (
    <Main />
      )
    : (
    <h1>No hay salas</h1>
      )
}

// export async function getServerSideProps () {
//   console.log('AIUUUDa')
//   const response = await (await fetch('http://localhost:5000/room')).json()
//   console.log(response)
//   return {
//     props: { initialRooms: response }
//   }
// }

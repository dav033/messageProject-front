import sockets from '../../socket'
import { useRouter } from 'next/router'
import { getRoomsLessTheUserRooms, subscribeToRoom } from '../../petitions'
import style from '../../styles/Rooms.module.scss'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RoomListItem from '@components/roomListItem'
import { useUser } from '../../stores'
import { useEffect, useState } from 'react'
export default function Rooms () {
  const router = useRouter()
  const user = useUser((state) => state.user)
  const revalidate = useUser((state) => state.revalidate)
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

  const isLogged = useUser((state) => state.isLogged)

  const joinRoom = async (idRoom) => {
    console.log('aaa')

    const idUser = user.id
    const response = await subscribeToRoom({ idRoom, idUser })
    console.log(response.success)
    if (response) {
      revalidate(user.id)

      sockets.emit('joinRoom', idRoom)
      router.push({
        pathname: '/rooms/[room]',
        query: { room: idRoom }
      })
      revalidate(user.id)

      // queryClient.invalidateQueries('prueba')
      // queryClient.invalidateQueries('getRooms')
    } else {
      revalidate(user.id)

      alert('No puedes entrar a esta sala')
    }
    revalidate(user.id)
  }

  function Main () {
    // const roomInformation = (room) => {
    //   return (
    //     <>
    //       <div id="usersInGroup" className="flexItem">
    //         <FontAwesomeIcon icon={faUser} />
    //         &nbsp;
    //         {room.users.length}
    //       </div>
    //       <div className="flexItem">{renderIconPerType(room.type)}</div>
    //     </>
    //   )
    // }
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

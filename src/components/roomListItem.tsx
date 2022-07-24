import style from '../styles/RoomListItem.module.scss'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FaUsers, FaUnlock, FaLock } from 'react-icons/fa'

import { RiGroup2Fill } from 'react-icons/ri'
import { Room } from '@helpers/interfaces'
interface Props {
  name: string
  joinFunction: any
  roomId: string
  image: string
  RenderIconPerType: any
  room: Room
}
export default function RoomListItem (props: Props) {
  function RenderRoomImage () {
    return image != null || undefined
      ? (
      <Image
        width={80}
        height={80}
        src={image}
        alt="roomImage"
        className={style.roomImage}
      />
        )
      : (
      <RiGroup2Fill className={style.AS} />
        )
  }

  const RenderIconPerType = (type) => {
    if (type === 'Publica') {
      return <FaUnlock />
    } else {
      return <FaLock />
    }
  }
  const { name, joinFunction, roomId, image, room } = props
  return (
    <div className={style.roomListItem}>
      <div className={style.imageContainer}>
        <RenderRoomImage />
      </div>

      <div className={style.nameContainer}>
        {' '}
        <h3>{name}</h3>
      </div>
      <div className={style.roomInformation}>
        <div className={style.usersNumber}>
          <b>0</b>
          <FontAwesomeIcon className="icon" icon={faUser} />
        </div>
        {RenderIconPerType(room.type)}
      </div>

      <div className={style.buttonContainer}>
        <button onClick={() => joinFunction(roomId)}>Unirse</button>
      </div>
    </div>
  )
}

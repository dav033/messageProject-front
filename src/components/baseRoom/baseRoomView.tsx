import RenderMessages from '@components/RenderMessages'
import TextArea from '@components/textArea'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormEvent } from 'react'
import style from '../../styles/BaseRoom.module.scss'
import { RiGroup2Fill } from 'react-icons/ri'

import FullModal from '@components/fullWidthModal/fullModal'
import SmoothScroll from '@components/smothScroll'
import { Room } from '@helpers/interfaces'

interface Props {
  context: string
  roomData: Room
  handleSendMessage: (e: FormEvent<HTMLFormElement>) => void
  messagesState: any
  modalOptions: {
    open: () => void
    close: () => void
    show: Boolean
  }
}

function RenderRoomimage () {
  return <RiGroup2Fill className={style.icon} />
}
export default function BaseRoomView (props: Props) {
  const { context, roomData, handleSendMessage, messagesState, modalOptions } =
    props

  console.log(messagesState)

  const { show, close, open } = modalOptions
  return (
    <SmoothScroll>
      <div className={style.seccionChat} style={{ height: '100%' }}>
        <FullModal show={show} close={close} roomData={roomData} />
        <div className={style.usuarioSeleccionado}>
          <div className={style.userContainer} onClick={open}>
            <div className={style.avatar}>
              <RenderRoomimage />
            </div>
            <div className={style.cuerpo}>
              {context === 'room' && roomData
                ? (
                <span style={{ color: 'white' }}>{roomData.name}</span>
                  )
                : null}
              {/* <span>Activo - Escribiendo...</span> */}
            </div>
          </div>

          <div className={style.opciones}>
            <ul>
              <li>
                <button type="button">
                  <i className="fas fa-video" />
                </button>
              </li>
              <li>
                <button type="button">
                  <i className="fas fa-phone-alt" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        <RenderMessages messages={messagesState} />

        <form
          className={style.textarea}
          onSubmit={(e) => handleSendMessage(e)}
          id="messageForm"
        >
          <TextArea handleSendMessage={handleSendMessage} />
          <div className={style.buttonContainer} id="prueba">
            <button type="submit" className={style.enviar} id="sendButton">
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </form>
      </div>
    </SmoothScroll>
  )
}

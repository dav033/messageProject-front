import ReorderContainer from '@components/reorderContainer'
import { Reorder } from 'framer-motion'
import style from '../../styles/ChatsDashboard.module.scss'
import { Room, Message } from '../../helpers/interfaces'
import { Dispatch, SetStateAction } from 'react'
interface Props {
  useAux: {
    room: Room
    lastMessage: Message
    lenghtMessages: number
  }[]
  setUseAux: Dispatch<
    SetStateAction<
      {
        room: Room
        lastMessage: Message
        lenghtMessages: number
      }[]
    >
  >
  RenderLastMessages: any
  renderDate: any
  userId: string
  privateChatInfo: {
    chatId: string
    userName: string
  }[]
}
export function ChatDashboardView (props: Props) {
  const {
    useAux,
    setUseAux,
    RenderLastMessages,
    renderDate,
    userId,
    privateChatInfo
  } = props

  return (
    <Reorder.Group
      style={{ width: '100%', height: '100%', margin: '0', padding: '0' }}
      axis="y"
      onReorder={setUseAux}
      values={useAux}
      className={style.container}
    >
      {useAux.map((chat) => (
        <ReorderContainer
          item={chat}
          key={chat.room._id}
          RenderLastMessages={RenderLastMessages}
          renderDate={renderDate}
          userId={userId}
          privateChatInfo={privateChatInfo}
        />
      ))}
    </Reorder.Group>
  )
}

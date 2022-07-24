import { Reorder, useDragControls, useMotionValue } from 'framer-motion'
import { useEffect } from 'react'
import { useMessages } from 'src/stores'
import { useRaisedShadow } from 'src/use-raised-shadow'
import RoomChatBox from './roomChatBox'

export default function ReorderContainer ({
  item,
  RenderLastMessages,
  renderDate,
  userId,
  privateChatInfo
}) {
  const y = useMotionValue(0)
  const boxShadow = useRaisedShadow(y)
  const dragControls = useDragControls()
  const messageAux = useMessages((state: { messageAux }) => state.messageAux)

  useEffect(() => {
    console.log('woo')
  }, [messageAux])

  return (
    <Reorder.Item
      value={item}
      id={messageAux}
      style={{ boxShadow, y }}
      dragListener={false}
      dragControls={dragControls}
    >
      <RoomChatBox
        chat={item}
        RenderLastMessages={RenderLastMessages}
        renderDate={renderDate}
        userId={userId}
        privateChatInfo={privateChatInfo}
      />
    </Reorder.Item>
  )
}

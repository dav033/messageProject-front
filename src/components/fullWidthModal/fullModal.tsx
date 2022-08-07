import { Room } from '@helpers/interfaces'
import FullModalView from './fullModalView'

interface Props {
  show: Boolean
  close: () => void
  roomData: Room
}
export default function FullModal (props: Props) {
  const { show, close } = props
  return <FullModalView show={show} close={close} />
}

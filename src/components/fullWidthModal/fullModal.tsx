import FullModalView from './fullModalView'

export default function FullModal ({ show, close, children }) {
  return (
    <FullModalView show={show} close={close}>
      {children}
    </FullModalView>
  )
}

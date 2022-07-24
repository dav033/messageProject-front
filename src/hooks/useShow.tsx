import { useState } from 'react'

export const useShow = () => {
  const [show, setShow] = useState<Boolean>(false)

  const open = () => {
    setShow(true)
  }
  const close = () => {
    setShow(false)
  }

  return { show, open, close }
}

import { useState, useEffect } from 'react'

export const useDocumentGet = (id: string) => {
  const [element, setElement] = useState<HTMLElement>()

  useEffect(() => {
    setElement(document.getElementById(id))
  }, [id])

  useEffect(() => {
    console.log('a')
  }, [element])

  return element
}

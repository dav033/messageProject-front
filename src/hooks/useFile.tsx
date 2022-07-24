import { useState, useEffect } from 'react'

export const useFile = (target: File) => {
  const [file, setFile] = useState<File>()
  const [fileUrl, setFileUrl] = useState<string>()

  useEffect(() => {
    if (target) {
      setFile(target)
      const imageUrl = URL.createObjectURL(target)
      setFileUrl(imageUrl)
    }
  }, [target])

  const clear = () => {
    setFile(undefined)
    setFileUrl(undefined)
  }

  return {
    file,
    fileUrl,
    clear
  }
}

import { useState, useEffect } from 'react'
import { useFile } from '../hooks/useFile'
import style from '../styles/File.module.scss'
import Spinner from './spinner'

export default function File (props: {
  func: any
  spinnerValue: Boolean
  isTheFatherOpen: Boolean
}) {
  const { func, spinnerValue, isTheFatherOpen } = props
  const [fileAux, setFileAux] = useState<File>()
  const { file, fileUrl, clear } = useFile(fileAux)
  useEffect(() => {
    func(file)
  }, [file])

  useEffect(() => {
    if (isTheFatherOpen) {
      setFileAux(null)
      clear()
    }
  }, [isTheFatherOpen])

  function RenderImage () {
    if (fileUrl) {
      return <img className={style.img} src={fileUrl} alt=""></img>
    } else {
      return null
    }
  }

  return (
    <div className={style.file} style={{ backgroundColor: '' }}>
      <Spinner spinnerValue={spinnerValue} />
      <label htmlFor="archivo">Elige un archivo</label>
      <input
        type="file"
        id="archivo"
        onChange={(e) => setFileAux(e.target.files[0])}
        className={style.input}
      />

      <div className={style.fileImg}>
        <RenderImage />
      </div>
    </div>
  )
}

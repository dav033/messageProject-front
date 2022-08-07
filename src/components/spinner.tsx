import { useEffect } from 'react'
import style from '../styles/File.module.scss'

export default function Spinner ({ spinnerValue }) {
  useEffect(() => {
    if (spinnerValue) {
      document.getElementById('spinnerContainer').style.display = 'block'
    } else {
      document.getElementById('spinnerContainer').style.display = 'none'
    }
  }, [spinnerValue])

  return (
    <div className={style.spinnerContainer} id="spinnerContainer">
      <div className={style.spinner} id="spinner"></div>
    </div>
  )
}

import React from 'react'
import style from '../styles/Message.module.scss'

interface Props {
  content: string
  time: string
  type: string
  date: string
  dateAux2: string
}
function Message (props: Props) {
  const { content, time, date, dateAux2 } = props
  const dateLessYear = `${date.split(' ')[0]} ${date.split(' ')[1]}`

  function DateAdviser () {
    if (date !== dateAux2) {
      return (
        <h1 className={style.date}>
          <b
            style={{
              backgroundColor: '#393E46',
              paddingTop: '7px',
              paddingBottom: '7px',
              paddingLeft: '10px',
              paddingRight: '10px',
              borderRadius: '20px',
              opacity: ''
            }}
          >
            {dateLessYear}
          </b>
        </h1>
      )
    } else {
      return null
    }
  }
  return (
    <>
      <DateAdviser />
      <div className={style.mensaje} id={style.right}>
        {/* <div className={style.avatar}>
            <img src="ruta_img" alt="mg" />
          </div> */}
        <div className={style.cuerpo}>
          <div className={style.texto}>{content}</div>
          <span className={style.tiempo} style={{ backgroundColor: '' }}>
            <i className="far fa-clock"></i>
            {time}
          </span>
          <ul className={style.opcionesMsj}>
            <li>
              <button type="button">
                <i className="fas fa-times"></i>
              </button>
            </li>
            <li>
              <button type="button">
                <i className="fas fa-share-square"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default React.memo(Message)

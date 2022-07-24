import React, { ChangeEvent, FormEvent, KeyboardEvent } from 'react'
import style from '../styles/BaseRoom.module.scss'

function TextArea ({ handleSendMessage }: any) {
  function onExpandableTextareaInput (e: ChangeEvent<HTMLTextAreaElement>) {
    const button = document.getElementById('prueba')
    const textArea = e.target

    if (textArea.value === '') {
      button.style.display = 'none'
    } else {
      button.style.display = 'flex'
    }
    const tx = e.target

    tx.style.height = 'auto'

    tx.style.height = tx.scrollHeight + 'px'
  }

  const enterTextArea = (
    e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    const ev = e as KeyboardEvent<HTMLTextAreaElement>
    const form = e as FormEvent<HTMLFormElement>
    if (ev.code === 'Enter' && ev.shiftKey === false) {
      e.preventDefault()
      handleSendMessage(form)
    }
  }
  return (
    <div className={style.inputContainer}>
      <textarea
        name="message"
        id="message"
        // htmlFor="messageForm"
        className={style.inputMessage}
        placeholder="Escribe un mensaje aqui"
        onChange={(e) => onExpandableTextareaInput(e)}
        onKeyDown={(e) => enterTextArea(e)}
        rows={1}
      />
    </div>
  )
}

export default React.memo(TextArea)

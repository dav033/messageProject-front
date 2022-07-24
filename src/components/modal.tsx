/* eslint-disable react/prop-types */
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from '../styles/Modal.module.scss'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { AnimatePresence, motion } from 'framer-motion'

const overlayVariants = {
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      duration: 0.3,
      delayChildren: 0.4
    }
  },
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
      duration: 0.3,
      delay: 0.4
    }
  }
}
function Modal ({ show, close, children, saveButtonFunction }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          className={style.modalOverlay}
        >
          <motion.div
            id="modal_container"
            initial={{ y: '100vh' }}
            animate={{ y: 0 }}
            exit={{ y: '100vh' }}
            transition={{ duration: 0.5 }}
          >
            <div className={style.modal}>
              <FontAwesomeIcon
                icon={faXmark}
                className={style.closeIcon}
                onClick={close}
              />

              <div
                className={style.children}
                style={{ width: '100%', minHeight: '200px' }}
              >
                {children}
              </div>

              <div className={style.buttonsContainer}>
                <button
                  className={style.modalButton}
                  id="close"
                  onClick={close}
                >
                  Cerrar
                </button>
                <button
                  className={style.modalButton}
                  id="save"
                  onClick={saveButtonFunction}
                >
                  Guardar
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default React.memo(Modal)

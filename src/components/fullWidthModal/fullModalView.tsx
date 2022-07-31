import { AnimatePresence, motion } from 'framer-motion'
import style from '../../styles/fullModal.module.scss'
import { GrClose } from 'react-icons/gr'
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

export default function FullModalView ({ show, close }) {
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
            className={style.modalContainer}
            id="modal_container"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GrClose className={style.close} onClick={close} />
            <div className={style.principalInfo}>
              <div className={style.imageContainer}></div>
              <div className={style.nameContainer}>
                <h2>Grupo de prueba</h2>
                <span>4 miembros</span>
              </div>
            </div>
            <div className={style.prueba}>hola</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

import DashboardList from '@components/dashboardList'
import Modal from '@components/modal'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from '../../styles/Dashboard.module.scss'
import File from '../file'
import ChatDashboard from '../chatDashboard/chatsDashboard'
interface Props {
  show: Boolean
  close: () => void
  uploadImage: () => Promise<void>
  funAux: (value: File) => void
  loading: Boolean
  isTheFatherOpen: Boolean
  closeMenu: () => void
  open: () => void
  userName: string
  openMenu: () => void
  RenderProfileImage: any
}
export default function DashboardView (props: Props) {
  const {
    show,
    close,
    uploadImage,
    funAux,
    loading,
    RenderProfileImage,
    closeMenu,
    open,
    userName,
    openMenu
  } = props
  return (
    <div className={style.dashboard}>
      <Modal show={show} close={close} saveButtonFunction={uploadImage}>
        <File func={funAux} spinnerValue={loading} isTheFatherOpen={show} />
      </Modal>
      <div
        className={style.overlay}
        id="overlay"
        onClick={() => closeMenu()}
      ></div>
      <div className={style.collapsileSidebar} id="collapsileSidebar">
        <div className={style.profileContainer}>
          <div className={style.userProfileImage}>
            <div className={style.overlayProfileImage} onClick={open}></div>

            <RenderProfileImage />
          </div>
          <h2 style={{ marginTop: '5px', color: '#dcdcdd' }}>{userName}</h2>
        </div>
        <DashboardList />
      </div>
      <div className={style.sidebar}>
        <div className={style.sidebarMenu} style={{ paddingTop: '10px' }}>
          <div
            style={{
              backgroundColor: '',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <FontAwesomeIcon
              className={style.iconMenu}
              icon={faBars}
              onClick={() => openMenu()}
            />
            <input
              type="text"
              placeholder="buscar.."
              className={style.searchInput}
            />
          </div>

          <ChatDashboard />
        </div>
      </div>
    </div>
  )
}

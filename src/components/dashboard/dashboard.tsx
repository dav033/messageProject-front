import { useShow } from '../../hooks/useShow'
import { FaRegUser } from 'react-icons/fa'

import React, { useCallback, useEffect, useState } from 'react'
import { uploadProfileImage } from '../../petitions'
import style from '../../styles/Dashboard.module.scss'
import Image from 'next/image'
import File from '../file'

import { useUser } from 'src/stores'
import DashboardView from './dashboardView'

function Dashboard () {
  const isLogged = useUser((state: { isLogged }) => state.isLogged)
  const user = useUser((state: { user }) => state.user)
  const revalidate = useUser((state: { revalidate }) => state.revalidate)
  const { show, open, close } = useShow()

  const [overlay, setOverlay] = useState<HTMLElement>(null)
  const [sidebar, setSidebar] = useState<HTMLElement>(null)
  const [loading, setLoading] = useState<Boolean>(false)

  useEffect(() => {
    if (user) {
      setOverlay(document.getElementById('overlay'))
      setSidebar(document.getElementById('collapsileSidebar'))
    }
  }, [user])

  const openMenu = useCallback(() => {
    console.log('Owowwowoo')
    console.log(overlay)
    overlay.style.display = 'block'
    sidebar.style.width = '250px'
  }, [overlay, style])

  function closeMenu () {
    overlay.style.display = 'none'
    sidebar.style.width = '0px'
  }

  useEffect(() => {
    if (show) {
      closeMenu()
    }
  }, [show])

  function RenderProfileImage () {
    if (user) {
      if (user.profileImage) {
        return (
          <Image
            src={user.profileImage}
            className={style.userProfileImage}
            alt="profileImage"
            width={'140px'}
            height={'140px'}
          ></Image>
        )
      } else {
        return <FaRegUser className={style.iconProfile} />
      }
    }
  }

  const uploadImage = async () => {
    setLoading(true)
    await uploadProfileImage(user.id, imageData)
    setLoading(false)
    // queryClient.invalidateQueries('prueba')
    close()
    revalidate(user.id)
  }

  const [imageData, setImageData] = useState<File>()

  const funAux = (value: File) => {
    setImageData(value)
  }

  return isLogged(user)
    ? (
    <DashboardView
      show={show}
      close={close}
      uploadImage={uploadImage}
      funAux={funAux}
      loading={loading}
      isTheFatherOpen={show}
      closeMenu={closeMenu}
      open={open}
      userName={user.userName}
      openMenu={openMenu}
      RenderProfileImage={RenderProfileImage}
    />
      )
    : null
}

export default React.memo(Dashboard)

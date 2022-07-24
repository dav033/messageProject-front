import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import BaseRoom from '@components/baseRoom/baseRoom'
function Chat () {
  const router = useRouter()
  useEffect(() => {}, [])

  return router.query
    ? (
    <BaseRoom
      receiver={router.query.data.toString()}
      context="provitionalChat"
    />
      )
    : null
}

export default React.memo(Chat)

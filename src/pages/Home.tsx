import React, { useCallback } from 'react'
import { useNavigate } from 'react-router'

export default React.memo(function Home() {
  const navigate = useNavigate()

  const clearSession = useCallback(() => {
    return new Promise((resolve) => {
      resolve(sessionStorage.removeItem('react-router-guard-test'))
    })
  }, [])

  const logout = useCallback(async () => {
    await clearSession()
    navigate('/')
  }, [clearSession, navigate])

  return (
    <div>
      Home, sweet home.
      <br />
      <button onClick={logout}>Clear</button>
    </div>
  )
})

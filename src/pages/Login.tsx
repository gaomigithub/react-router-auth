import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { routerMap } from '../routerMap'

export default React.memo(function Login() {
  const [username, setUsername] = useState<string | null>(null)
  const [passwords, setPasswords] = useState<string | null>(null)
  const navigate = useNavigate()

  const goToHome = useCallback(() => {
    const homePath = routerMap.find((item) => item.name === 'home')?.path
    homePath &&
      sessionStorage.getItem('react-router-guard-test') &&
      navigate(homePath)
  }, [navigate])

  const setUserInfo = useCallback(() => {
    const jsonStr = JSON.stringify({ username, passwords })
    if (username && passwords) {
      sessionStorage.setItem('react-router-guard-test', jsonStr)
    }

    return new Promise<void>((resolve, reject) => {
      if (username && passwords) {
        resolve(sessionStorage.setItem('react-router-guard-test', jsonStr))
      } else reject('Something wrong happened.')
    })
  }, [passwords, username])

  const login = useCallback(async () => {
    await setUserInfo()
    goToHome()
  }, [goToHome, setUserInfo])

  const clearInputs = useCallback(() => {
    setUsername(null)
    setPasswords(null)
    sessionStorage.removeItem('react-router-guard-test')
    console.log('clearInputs: ', { username, passwords })
  }, [passwords, username])

  const clearSession = useCallback(() => {
    sessionStorage.removeItem('react-router-guard-test')
    console.log(
      'clearSession, curr session: ',
      sessionStorage.getItem('react-router-guard-test')
    )
  }, [])

  const clear = useCallback(() => {
    clearInputs()
    clearSession()
  }, [clearInputs, clearSession])

  return (
    <div>
      <h2>Login:</h2>

      <ul>
        <li>
          Username:
          <input
            type="text"
            value={username ?? ''}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </li>
        <li>
          Passwords:
          <input
            type="text"
            value={passwords ?? ''}
            onChange={(e) => setPasswords(e.target.value)}
          ></input>
        </li>
      </ul>

      <button onClick={login}>Go</button>
      <button onClick={clear}>Clear</button>
    </div>
  )
})

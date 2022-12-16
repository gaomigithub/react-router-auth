import './App.css'
import React, { Fragment } from 'react'
import { Routes, useLocation } from 'react-router-dom'
import RouterGuard from './RouterGuard'
import { routerMap } from './routerMap'

// TODO-BUG：这样的封装有问题，暂时无视APP.tsx
function App() {
  const location = useLocation()

  return (
    <Fragment>
      {/*只匹配一个，匹配成功就不往下匹配，效率高*/}
      <Routes location={location} key={location.pathname}>
        <RouterGuard routerConfig={routerMap} />
      </Routes>
    </Fragment>
  )
}

export default App

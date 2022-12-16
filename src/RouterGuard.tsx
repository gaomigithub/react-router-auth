/**
 * 路由守卫校验
 */
import React, { useCallback, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { Routes, useLocation, useNavigate } from 'react-router'
import { RouterMap } from './routerMap'

interface PropsType {
  routerConfig: RouterMap
}

export default React.memo(function RouterGuard(props: PropsType) {
  const { routerConfig } = props
  const location = useLocation()
  const navigate = useNavigate()

  const isLogin = sessionStorage.getItem('react-router-guard-test')
  console.log({ location, pathname: location?.pathname, isLogin })
  const targetRouterConfig = routerConfig.find(
    (item) => item.path === location?.pathname
  )

  const goTo = useCallback(
    (path: string) => {
      navigate(path)
    },
    [navigate]
  )

  useEffect(() => {
    if (targetRouterConfig && !targetRouterConfig.auth && !isLogin) {
      goTo(targetRouterConfig.path)
    }
    if (isLogin) {
      // 如果是登陆状态，想要跳转到登陆，重定向到主页
      if (targetRouterConfig?.path === '/login') {
        goTo('/')
      } else {
        // 如果路由合法，就跳转到相应的路由
        if (targetRouterConfig) {
          goTo(targetRouterConfig?.path)
        } else {
          // 如果路由不合法，重定向到 404 页面
          goTo('/error')
        }
      }
    } else {
      console.log({ targetRouterConfig })
      // 非登陆状态下，当路由合法时且需要权限校验时，跳转到登陆页面，要求登陆
      if (targetRouterConfig) {
        if (targetRouterConfig.auth) {
          goTo('/login')
        } else {
          goTo(targetRouterConfig.path)
        }
      } else {
        goTo('/error')
      }
    }
  }, [isLogin, routerConfig, targetRouterConfig, goTo])

  return (
    <Routes location={location} key={location.pathname}>
      {routerConfig.map((item, index) => {
        return <Route key={index} path={item.path} element={item.component} />
      })}
    </Routes>
  )
})

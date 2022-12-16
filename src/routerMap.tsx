/**
 * 定义路由组件，将 auth 设置为 true，表示该路由需要权限校验
 */

// import Home from './pages/Home'
// import Login from './pages/Login'
// import Error from './pages/Error'
import { lazy } from 'react'

export type RouterMap = Array<{
  path: string
  name: string
  component: React.ReactNode | null
  auth?: boolean
}>

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Error = lazy(() => import('./pages/Error'))
const Test = lazy(() => import('./pages/Test'))

export const routerMap: RouterMap = [
  { path: '/', name: 'home', component: <Home />, auth: true },
  { path: '/login', name: 'Login', component: <Login /> },
  { path: '/error', name: 'error', component: <Error /> },
  { path: '/test', name: 'test', component: <Test /> },
]

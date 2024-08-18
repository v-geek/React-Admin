import { RootState, useSelector } from '@/store'
import logo from '@/assets/imgs/logo.svg'
import './index.scss'
import Menu from './components/Menu'
import Main from './components/Main'

const TITLE = import.meta.env.VITE_TITLE

const Layout = () => {
  const isCollapse = useSelector((state: RootState) => state.system.sideBar.isCollapse)
  const sideBarWidth = isCollapse ? 64 : 210

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <div className="sidebar" style={{ width: sideBarWidth + 'px' }}>
        <div className="logo">
          <img src={logo} alt="logo" />
          {!isCollapse && <span>{TITLE}</span>}
        </div>

        <Menu />
      </div>

      <div className="flex-1 overflow-hidden">
        <Main />
      </div>
    </div>
  )
}

export default Layout

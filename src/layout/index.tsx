import { RootState, useDispatch, useSelector } from '@/store'
import logo from '@/assets/imgs/logo.svg'
import './index.scss'
import Menu from './components/Menu'
import Header from './components/Header'
import Tabs from './components/Tabs'
import Main from './components/Main'
import { getUserInfo } from '@/store/modules/user'

const TITLE = import.meta.env.VITE_TITLE

const Layout = () => {
  const isCollapse = useSelector((state: RootState) => state.system.sideBar.isCollapse)
  const sideBarWidth = isCollapse ? 64 : 210
  const dispath = useDispatch()

  const test = async () => {
    const thunkRes = await dispath(getUserInfo('test-id-541321321'))
    console.log('thunkRes', thunkRes)
  }

  test()

  return (
    <div className="flex">
      <div className="sidebar" style={{ width: sideBarWidth + 'px' }}>
        <div className="logo">
          <img src={logo} alt="logo" />
          {!isCollapse && <span>{TITLE}</span>}
        </div>

        <Menu />
      </div>

      <div className="right-layout">
        <Header />
        <Tabs />
        <Main />
      </div>
    </div>
  )
}

export default Layout

import Collapse from './components/Collapse'
import DarkIcon from './components/DarkIcon'
import Setting from './components/Setting'
import './index.scss'

const Header = () => {
  return (
    <div className="header">
      <Collapse />

      <div className="flex-c gap-5">
        <DarkIcon />
        <Setting />
      </div>
    </div>
  )
}

export default Header

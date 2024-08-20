import Collapse from './components/Collapse'
import Setting from './components/Setting'
import './index.scss'

const Header = () => {
  return (
    <div className="header">
      <Collapse />

      <div>
        <Setting />
      </div>
    </div>
  )
}

export default Header

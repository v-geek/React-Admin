import Collapse from './components/Collapse'
import Breadcrumb from './components/Breadcrumb'
import ComponentSize from './components/ComponentSize'
import Fullscreen from './components/Fullscreen'
import DarkIcon from './components/DarkIcon'
import I18nIcon from './components/I18nIcon'
import Setting from './components/Setting'
import './index.scss'

const Header = () => {
  return (
    <div className="header">
      <div className="flex-c gap-5">
        <Collapse />
        <Breadcrumb />
      </div>

      <div className="flex-c gap-5">
        <ComponentSize />
        <Fullscreen />
        <DarkIcon />
        <I18nIcon />
        <Setting />
      </div>
    </div>
  )
}

export default Header

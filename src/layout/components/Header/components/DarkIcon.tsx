import { Switch } from 'antd'
import { SunOutlined, MoonOutlined } from '@ant-design/icons'
import { RootState, useDispatch, useSelector } from '@/store'
import { setSystemState } from '@/store/modules/system'

const DarkIcon = () => {
  const dispatch = useDispatch()
  const isDark = useSelector((state: RootState) => state.system.isDark)

  return (
    <Switch
      checkedChildren={<SunOutlined />}
      unCheckedChildren={<MoonOutlined />}
      checked={isDark}
      onChange={(value) => dispatch(setSystemState({ key: 'isDark', value }))}
    />
  )
}

export default DarkIcon

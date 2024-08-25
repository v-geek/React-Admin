import { Dropdown, MenuProps } from 'antd'
import { RootState, useSelector, useDispatch } from '@/store'
import { setSystemState } from '@/store/modules/system'
import SvgIcon from '@/components/SvgIcon'

const I18nIcon = () => {
  const dispatch = useDispatch()
  const language = useSelector((state: RootState) => state.system.language)

  const items = [
    { key: 'zh', label: '简体中文', disabled: language === 'zh' },
    { key: 'en', label: 'English', disabled: language === 'en' },
  ]

  const setLanguage: MenuProps['onClick'] = ({ key }) => {
    dispatch(setSystemState({ key: 'language', value: key }))
  }

  return (
    <Dropdown menu={{ items, onClick: setLanguage }} placement="bottom" arrow={true}>
      <div className="header-icon flex-c">
        <SvgIcon name="globalization" />
      </div>
    </Dropdown>
  )
}

export default I18nIcon

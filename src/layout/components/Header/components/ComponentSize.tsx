import { Dropdown, MenuProps } from 'antd'
import { RootState, useSelector, useDispatch } from '@/store'
import { setSystemState } from '@/store/modules/system'
import Iconify from '@/components/Icon/Iconify'

const ComponentSize = () => {
  const dispatch = useDispatch()
  const componentSize = useSelector((state: RootState) => state.system.componentSize)

  const items = [
    { key: 'small', label: '小型', disabled: componentSize === 'small' },
    { key: 'middle', label: '默认', disabled: componentSize === 'middle' },
    { key: 'large', label: '大型', disabled: componentSize === 'large' },
  ]

  const setSize: MenuProps['onClick'] = ({ key }) => {
    dispatch(setSystemState({ key: 'componentSize', value: key }))
  }

  return (
    <Dropdown menu={{ items, onClick: setSize }} placement="bottom" arrow={true}>
      <div className="header-icon flex-c">
        <Iconify icon="ep:operation" />
      </div>
    </Dropdown>
  )
}

export default ComponentSize

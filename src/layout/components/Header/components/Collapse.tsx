import { RootState, useDispatch, useSelector } from '@/store'
import { setSideBarState } from '@/store/modules/system'
import { AntdIcon } from '@/components/Icon/AntdIcon'

const Collapse = () => {
  const dispatch = useDispatch()
  const isCollapse = useSelector((state: RootState) => state.system.sideBar.isCollapse)

  const handleClick = () => {
    dispatch(setSideBarState({ key: 'isCollapse', value: !isCollapse }))
  }

  return (
    <AntdIcon
      name={isCollapse ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'}
      className="header-icon"
      onClick={handleClick}
    />
  )
}

export default Collapse

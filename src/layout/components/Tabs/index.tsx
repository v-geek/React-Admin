import { useLocation, useMatches, useNavigate } from 'react-router-dom'
import { Tabs as AntdTabs } from 'antd'
import { useUpdateEffect } from 'ahooks'
import { RootState, useDispatch, useSelector } from '@/store'
import './index.scss'
import { Meta } from '@/router/types'
import { addTab, removeTab } from '@/store/modules/tabs'
import { useEffect } from 'react'
import { useTabsDrag } from '@/hooks/useTabsDrag'

type TargetKey = string | React.MouseEvent | React.KeyboardEvent

const Tabs = () => {
  const matches = useMatches()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const { initTabsDrag } = useTabsDrag()

  const fullPath = location.pathname + location.search

  const tabList = useSelector((state: RootState) => state.tabs.tabList)

  const items = tabList.map((item) => ({
    key: item.fullPath,
    label: item.title,
  }))

  useEffect(initTabsDrag, [])

  // 监听路由变化
  useUpdateEffect(() => {
    const meta = matches[matches.length - 1].data as Meta & { redirect: boolean }

    const tabItem = {
      title: meta.title!,
      fullPath,
    }

    dispatch(addTab(tabItem))
  }, [matches])

  // 切换面板的回调
  const onChange = (path: string) => {
    navigate(path)
  }

  // 处理删除Tab逻辑
  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'remove' && typeof targetKey == 'string') {
      dispatch(removeTab({ fullPath: targetKey, isCurrent: targetKey === fullPath }))
    }
  }

  return (
    <div className="tabs">
      <div>
        <AntdTabs
          type="editable-card"
          hideAdd
          size="small"
          onChange={onChange}
          activeKey={fullPath}
          onEdit={onEdit}
          items={items}
        />
      </div>
    </div>
  )
}

export default Tabs

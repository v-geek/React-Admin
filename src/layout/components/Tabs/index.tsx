import { useEffect, useState } from 'react'
import { useLocation, useMatches, useNavigate } from 'react-router-dom'
import { Tabs as AntdTabs, Dropdown } from 'antd'
import { useUpdateEffect } from 'ahooks'
import { RootState, useDispatch, useSelector } from '@/store'
import './index.scss'
import { Meta } from '@/router/types'
import { addTab, removeTab } from '@/store/modules/tabs'
import { useTabsDrag } from '@/hooks/useTabsDrag'
import MoreButton from './MoreButton'
import { useOperate } from './useOperate'
import { TabItem } from '@/store/types'

type TargetKey = string | React.MouseEvent | React.KeyboardEvent

const Tabs = () => {
  const matches = useMatches()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const { initTabsDrag } = useTabsDrag()
  const [curTab, setCurTab] = useState<TabItem>()

  const fullPath = location.pathname + location.search

  const { getDropdownItems } = useOperate(fullPath)

  const tabList = useSelector((state: RootState) => state.tabs.tabList)

  const items = tabList.map((tab) => ({
    key: tab.fullPath,
    label: (
      <Dropdown
        menu={{ items: getDropdownItems(tab) }}
        placement="bottom"
        arrow={true}
        trigger={['contextMenu']}
      >
        <span>{tab.title}</span>
      </Dropdown>
    ),
  }))

  useEffect(initTabsDrag, [])

  // 监听路由变化
  useUpdateEffect(() => {
    const meta = matches[matches.length - 1].data as Meta & { redirect: boolean }

    const tabItem = {
      title: meta.title!,
      fullPath,
    }

    setCurTab(tabItem)
    dispatch(addTab(tabItem))
  }, [matches])

  // 切换面板的回调
  const onTabClick = (path: string) => {
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
      <AntdTabs
        type="editable-card"
        hideAdd
        size="small"
        onTabClick={onTabClick}
        activeKey={fullPath}
        onEdit={onEdit}
        items={items}
        tabBarExtraContent={<MoreButton curTab={curTab} />}
      />
    </div>
  )
}

export default Tabs

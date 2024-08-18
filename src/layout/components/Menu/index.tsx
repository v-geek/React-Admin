import { useEffect, useMemo, useState } from 'react'
import { Menu as AntdMenu } from 'antd'
import { shallowEqual } from 'react-redux'
import { RootState, useSelector } from '@/store'
import { getOpenKeys, handleMenuFormat } from '@/layout/utils'
import { useLocation, useMatches, useNavigate } from 'react-router-dom'
import { Meta } from '@/router/types'

const Menu = () => {
  const { isCollapse, showMenuList, flatMenuList } = useSelector(
    (state: RootState) => ({
      isCollapse: state.system.sideBar.isCollapse,
      showMenuList: state.permission.showMenuList,
      flatMenuList: state.permission.flatMenuList,
    }),
    shallowEqual
  )

  const matches = useMatches()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // 当前菜单选中项
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  // 当前菜单展开项
  const [openKeys, setOpenKeys] = useState<string[]>([])

  const antdMenuList = useMemo(() => handleMenuFormat(showMenuList), [showMenuList])

  useEffect(() => {
    // 页面刷新还原菜单选中
    const meta = matches[matches.length - 1].data as Meta
    const path = meta?.activeMenu ?? pathname
    setSelectedKeys([path])

    // 页面刷新还原菜单展开
    setTimeout(() => {
      isCollapse || setOpenKeys(getOpenKeys(pathname))
    })
  }, [matches, isCollapse])

  const handleClick = ({ key }) => {
    handleNavigation(key)
  }

  const handleNavigation = (path: string) => {
    const menuItem = flatMenuList.find((item) => item.path === path)
    if (menuItem?.meta?.isLink) window.open(menuItem.meta.isLink, '_blank')
    navigate(path)
  }

  // 每次点击 展开 | 收缩 按钮 重新设置keys
  const onOpenChange = (openKeys: string[]) => {
    if (openKeys.length <= 1) return setOpenKeys(openKeys)

    const lastOpenKey = openKeys[openKeys.length - 1]

    // 点击的是嵌套菜单
    if (lastOpenKey.includes(openKeys[0])) {
      return setOpenKeys(openKeys)
    }

    // 手风琴模式
    setOpenKeys([lastOpenKey])
  }

  return (
    <AntdMenu
      theme="dark"
      mode="inline"
      onClick={handleClick}
      inlineCollapsed={isCollapse}
      items={antdMenuList}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
    />
  )
}

export default Menu

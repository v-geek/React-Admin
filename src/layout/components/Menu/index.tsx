import { useEffect, useMemo, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { useLocation, useMatches, useNavigate } from 'react-router-dom'
import { Menu as AntdMenu, ConfigProvider } from 'antd'
import { RootState, useSelector } from '@/store'
import { getOpenKeys, handleMenuFormat } from '@/layout/utils'
import { Meta } from '@/router/types'
import './index.scss'

const Menu = () => {
  const { isDark, isCollapse, showMenuList, flatMenuList, menuAccordion } = useSelector(
    (state: RootState) => ({
      isDark: state.system.isDark,
      isCollapse: state.system.sideBar.isCollapse,
      showMenuList: state.permission.showMenuList,
      flatMenuList: state.permission.flatMenuList,
      menuAccordion: state.system.menuAccordion,
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
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            darkItemBg: isDark ? '#2d2d2d' : '#001529',
            darkSubMenuItemBg: isDark ? '#1f1f1f' : '#0c2135',
            itemBorderRadius: 0,
            subMenuItemBorderRadius: 0,
            itemMarginInline: 0,
          },
        },
      }}
    >
      <AntdMenu
        theme="dark"
        mode="inline"
        onClick={handleClick}
        inlineCollapsed={isCollapse}
        items={antdMenuList}
        selectedKeys={selectedKeys}
        {...(menuAccordion ? { openKeys, onOpenChange } : {})}
      />
    </ConfigProvider>
  )
}

export default Menu

import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuProps } from 'antd'
import {
  CloseOutlined,
  ColumnWidthOutlined,
  FullscreenOutlined,
  MinusOutlined,
  ReloadOutlined,
  VerticalLeftOutlined,
  VerticalRightOutlined,
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { RootState, useDispatch, useSelector } from '@/store'
import { setSystemState } from '@/store/modules/system'
import {
  removeLeftTabs,
  removeMultipleTabs,
  removeRightTabs,
  removeTab,
} from '@/store/modules/tabs'
import type { TabItem } from '@/store/types'
import { RefreshContext } from '@/context/Refresh'
import { message } from '@/hooks/useMessage'
import { HOME_URL } from '@/config'

export const useOperate = (fullPath: string) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { updateOutletShow } = useContext(RefreshContext)
  const tabList = useSelector((state: RootState) => state.tabs.tabList)

  const { t } = useTranslation()

  const getTabIndex = (tab: TabItem) => {
    const mouseRightIndex = tabList.findIndex((item) => item.fullPath === tab.fullPath)
    const curIndex = tabList.findIndex((item) => item.fullPath === fullPath)
    return { mouseRightIndex, curIndex }
  }

  const refresh = ({ domEvent }) => {
    domEvent.stopPropagation()
    updateOutletShow(false)
    setTimeout(() => updateOutletShow(true))
  }

  // 没有阻止冒泡, 触发Tab的点击事件, 最大化时 若不是当前Tab 刚好切换过去
  const maximize = () => {
    dispatch(setSystemState({ key: 'mainMaximize', value: true }))
  }

  const closeCurrentTab = ({ domEvent }, tab: TabItem) => {
    domEvent.stopPropagation()
    const action = removeTab({
      fullPath: tab.fullPath,
      isCurrent: fullPath === tab.fullPath,
    })
    dispatch(action)
  }

  const closeLeftTabs = ({ domEvent }, tab: TabItem) => {
    domEvent.stopPropagation()

    if (tabList.length === 1) {
      return message.info('左侧没有其它页面了~')
    }

    const { mouseRightIndex, curIndex } = getTabIndex(tab)

    // 删除的Tab在当前Tab的右侧, 则默认跳转到当前鼠标右键的Tab
    if (mouseRightIndex > curIndex) {
      navigate(tab.fullPath)
    }

    dispatch(removeLeftTabs(tab.fullPath))
  }

  const closeRightTabs = ({ domEvent }, tab: TabItem) => {
    domEvent.stopPropagation()

    if (tabList.length === 1) {
      return message.info('右侧没有其它页面了~')
    }

    const { mouseRightIndex, curIndex } = getTabIndex(tab)

    // 删除的Tab在当前Tab的左侧, 则默认跳转到当前鼠标右键的Tab
    if (mouseRightIndex < curIndex) {
      navigate(tab.fullPath)
    }

    dispatch(removeRightTabs(tab.fullPath))
  }

  const closeOtherTabs = ({ domEvent }, tab: TabItem) => {
    domEvent.stopPropagation()

    if (tabList.length === 1) {
      return message.info('当前没有其它页面了~')
    }

    const { mouseRightIndex, curIndex } = getTabIndex(tab)

    if (mouseRightIndex !== curIndex) {
      navigate(tab.fullPath)
    }

    dispatch(removeMultipleTabs(tab.fullPath))
  }

  const closeAllTabs = ({ domEvent }) => {
    domEvent.stopPropagation()
    dispatch(removeMultipleTabs())
    navigate(HOME_URL)
  }

  const getDropdownItems = (tab: TabItem): MenuProps['items'] => [
    {
      key: 1,
      label: <span>{t('tabs.refresh')}</span>,
      icon: <ReloadOutlined />,
      onClick: (event) => refresh(event),
    },
    {
      key: 2,
      label: <span>{t('tabs.maximize')}</span>,
      icon: <FullscreenOutlined />,

      onClick: () => maximize(),
    },
    {
      type: 'divider',
    },
    {
      key: 3,
      label: <span>{t('tabs.closeCurrent')}</span>,
      icon: <CloseOutlined />,
      onClick: (event) => closeCurrentTab(event, tab),
    },
    {
      key: 4,
      label: <span>{t('tabs.closeLeft')}</span>,
      icon: <VerticalRightOutlined />,
      onClick: (event) => closeLeftTabs(event, tab),
    },
    {
      key: 5,
      label: <span>{t('tabs.closeRight')}</span>,
      icon: <VerticalLeftOutlined />,
      onClick: (event) => closeRightTabs(event, tab),
    },
    {
      type: 'divider',
    },
    {
      key: 6,
      label: <span>{t('tabs.closeOther')}</span>,
      icon: <ColumnWidthOutlined />,
      onClick: (event) => closeOtherTabs(event, tab),
    },
    {
      key: 7,
      label: <span>{t('tabs.closeAll')}</span>,
      icon: <MinusOutlined />,
      onClick: (event) => closeAllTabs(event),
    },
  ]

  return {
    getDropdownItems,
  }
}

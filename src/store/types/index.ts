import { Route, RouteList } from '@/router/types'
import { SizeType } from 'antd/es/config-provider/SizeContext'

export interface userState {
  token: null | string
  userInfo: null | UserInfo
}

export interface UserInfo {
  username: 'Admin'
  [key: string]: any
}

export type LayoutType = 'vertical' | 'classic' | 'transverse' | 'columns'

export type LanguageType = 'zh' | 'en' | null

export interface SystemState {
  layout: LayoutType
  sideBar: {
    isCollapse: boolean
  }
  keepAliveNameList: string[]
  // tabList: TabList
  tabList: any
  mainMaximize: boolean
  isDark: boolean
  themeColor: string
  language: LanguageType
  menuAccordion: boolean
  componentSize: SizeType
  grayMode: boolean
  weakMode: boolean
  compactAlgorithm: boolean
  isHappy: boolean
}

export interface PermissionState {
  curRouteName: string
  buttonData: Recordable<string[]>
  menuList: RouteList
  showMenuList: RouteList
  flatMenuList: RouteList
}

export interface IConfigState {
  mapConfig: {
    key: string
    securityJsCode: string
  }
}

export interface LockState {
  lockInfo: LockInfo
}

export interface LockInfo {
  isLock?: boolean
  password?: string | undefined
}

export interface TabItem {
  title: string
  fullPath: string
  icon?: string
  closable?: boolean
}

export type TabList = TabItem[]

export interface TabsState {
  tabList: TabItem[]
}

export interface userState {
  token: null | string
  userInfo: null | UserInfo
}

export interface UserInfo {
  username: 'Admin'
  [key: string]: any
}

export type LayoutType = 'vertical' | 'classic' | 'transverse' | 'columns'

export type ComponentSize = 'small' | 'default' | 'large'

export type LanguageType = 'zh' | 'en' | null

export interface SystemState {
  layout: LayoutType
  sideBar: {
    isCollapse: boolean
  }
  keepAliveNameList: string[]
  tabList: TabList
  mainMaximize: boolean
  isDark: boolean
  themeColor: string
  language: LanguageType
  menuAccordion: boolean
  componentSize: ComponentSize
  grayMode: boolean
  weakMode: boolean
}

export interface PermissionState {
  curRouteName: string
  buttonData: {
    [key: string]: string[]
  } | null
  menuList: MenuList | any
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

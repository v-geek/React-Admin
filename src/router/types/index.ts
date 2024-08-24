import { RouteObject } from 'react-router-dom'

export interface Meta {
  name?: string
  icon?: string
  title?: string
  activeMenu?: string
  isLink?: string
  hide?: boolean
  isFull?: boolean
  // isAffix?: boolean
  keepAlive?: boolean
  mainFull?: boolean
}

export type Route = Omit<RouteObject, 'children' | 'component'> & {
  name?: string
  redirect?: string
  meta?: Meta
  children?: Route[]
  component?: React.ReactNode | null
}

export type RouteList = Route[]

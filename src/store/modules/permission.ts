import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { PermissionState } from '../types'
import { RouteList } from '@/router/types'
import { getShowMenuList, getFlatMenuList } from '@/router/utils'

const permissionState: PermissionState = {
  // 菜单权限
  menuList: [],
  showMenuList: [],
  flatMenuList: [],
  // 用户所有的按钮权限
  buttonData: null,
  // 当前页面的 route name, 用来做按钮权限筛选
  curRouteName: '',
}

const permissionSlice = createSlice({
  name: 'permission',
  initialState: permissionState,
  reducers: {
    setMenuList(state, { payload }: PayloadAction<RouteList>) {
      state.menuList = payload
      state.showMenuList = getShowMenuList(payload)
      state.flatMenuList = getFlatMenuList(payload)
    },
  },
})

export const { setMenuList } = permissionSlice.actions

export default permissionSlice.reducer

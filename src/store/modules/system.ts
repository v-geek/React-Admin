import { createSlice } from '@reduxjs/toolkit'
import { SystemState } from '../types'

const systemSlice = createSlice({
  name: 'system',
  initialState: {
    layout: 'vertical',
    sideBar: {
      // 是否折叠菜单
      isCollapse: false,
    },
    // 以route.name作为缓存的Key
    keepAliveNameList: [],
    tabList: [],
    // main区域是否全屏
    mainMaximize: false,
    isDark: false,
    themeColor: '#1890ff',
    language: null,
    menuAccordion: true,
    componentSize: 'middle',
    grayMode: false,
    weakMode: false,
    compactAlgorithm: false,
    isHappy: false,
  } as SystemState,
  reducers: {
    setSystemState(state, { payload }) {
      state[payload.key] = payload.value
    },
  },
})

export const { setSystemState } = systemSlice.actions

export default systemSlice.reducer

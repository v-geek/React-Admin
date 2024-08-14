import { createSlice } from '@reduxjs/toolkit'

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
    // 当前系统语言
    language: null,
    menuAccordion: true,
    componentSize: 'default',
    grayMode: false,
    weakMode: false,
  },
  reducers: {
    setSystemState(state, { payload }) {
      state[payload.key] = payload.value
    },
  },
})

export const { setSystemState } = systemSlice.actions

export default systemSlice.reducer

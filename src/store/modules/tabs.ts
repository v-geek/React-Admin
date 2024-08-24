import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TabItem, TabsState } from '../types'
import { HOME_URL } from '@/config'

const tabsState: TabsState = {
  tabList: [],
}

const tabsSlice = createSlice({
  name: 'tabs',
  initialState: tabsState,
  reducers: {
    addTab({ tabList }, { payload }: PayloadAction<TabItem>) {
      let replaceIndex = null

      const hasTab = tabList.some((item, index) => {
        if (item.fullPath === payload.fullPath) {
          replaceIndex = index
          return true
        }
        return false
      })

      if (!hasTab) {
        tabList.push(payload)
      } else {
        tabList[replaceIndex] = payload
      }
    },
    removeTab(
      { tabList },
      {
        payload: { fullPath, isCurrent },
      }: PayloadAction<{ fullPath: string; isCurrent: boolean }>
    ) {
      // 如果删除的是当前Tab: 默认切换到下一个Tab
      if (isCurrent) {
        tabList.forEach((item, index) => {
          if (item.fullPath !== fullPath) return
          const nextShowTab = tabList[index + 1] || tabList[index - 1]
          // 删除的是唯一的一个Tab, 则不需要切换Tab
          if (!nextShowTab) {
            return window.$navigate(HOME_URL)
          }
          window.$navigate(nextShowTab.fullPath)
        })
      }

      const delIndex = tabList.findIndex((item: TabItem) => item.fullPath === fullPath)
      tabList.splice(delIndex, 1)
    },
    sortTabs(
      { tabList },
      {
        payload: { oldIndex, newIndex },
      }: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) {
      const currentTab = tabList[oldIndex]
      tabList.splice(oldIndex, 1)
      tabList.splice(newIndex, 0, currentTab)
    },
    removeLeftTabs({ tabList }, { payload }: PayloadAction<string>) {
      const delIndex = tabList.findIndex((item: TabItem) => item.fullPath === payload)
      tabList.splice(0, delIndex)
    },
    removeRightTabs({ tabList }, { payload }: PayloadAction<string>) {
      const delIndex = tabList.findIndex((item: TabItem) => item.fullPath === payload)
      tabList.splice(delIndex + 1)
    },
    // 删除多个Tab
    // 不传fullPath则是 删除所有Tab
    removeMultipleTabs(state, { payload }: PayloadAction<string | undefined>) {
      state.tabList = state.tabList.filter((item: TabItem) => item.fullPath === payload)
    },
  },
})

export const {
  addTab,
  removeTab,
  sortTabs,
  removeLeftTabs,
  removeRightTabs,
  removeMultipleTabs,
} = tabsSlice.actions

export default tabsSlice.reducer

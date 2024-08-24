import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getUserInfoApi } from '@/api/modules/user'
import { UserState } from '../types'
import { AppDispatch, RootState } from '..'

// 修改初始值的时候  如何同步到storage中

const userState: UserState = {
  token: 'xxxxxx',
  userInfo: null,
  testData: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState: userState,
  selectors: {
    getTestData: (state) => {
      // return state.testData.concat('test1', { a: 11, b: 545 })
      return state.token
    },
  },
  reducers: {
    setToken(state, { payload }: PayloadAction<string>) {
      state.token = payload
    },
    testThunk(state, { payload }: PayloadAction<string>) {
      console.log('测试结果', payload)
    },
  },
})

export const { getTestData } = userSlice.selectors
export const { setToken, testThunk } = userSlice.actions
export default userSlice.reducer

export const getUserInfo = (id: string) => {
  return async (dispatch: AppDispatch, getState: Func<RootState>) => {
    const res = await getUserInfoApi(id)
    console.log('res', res)
    dispatch(testThunk(res as string))
    return { name: 'zzy', success: true }
  }
}

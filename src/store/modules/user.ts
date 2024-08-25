import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { UserState } from '../types'

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
    testThunk(state, { payload }: PayloadAction<any>) {
      console.log('测试thunk结果', payload)
    },
    testLikesSaga(state, { payload }: PayloadAction<any>) {
      console.log('测试saga结果-likes', payload)
    },
    testLikesJob(state, { payload }: PayloadAction<any>) {
      console.log('测试saga结果-job', payload)
    },
  },
})

export const { getTestData } = userSlice.selectors
export const { setToken, testThunk, testLikesSaga, testLikesJob } = userSlice.actions
export default userSlice.reducer

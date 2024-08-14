import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { userState } from '../types'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: 'dwadwa',
    userInfo: null,
  } as userState,
  reducers: {
    setToken(state, { payload }: PayloadAction<string>) {
      state.token = payload
    },
  },
})

export const { setToken } = userSlice.actions

export default userSlice.reducer

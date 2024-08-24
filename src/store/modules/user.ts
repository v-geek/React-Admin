import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { UserState } from '../types'

const userState: UserState = {
  token: 'dwadwa',
  userInfo: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {
    setToken(state, { payload }: PayloadAction<string>) {
      state.token = payload
    },
  },
})

export const { setToken } = userSlice.actions

export default userSlice.reducer

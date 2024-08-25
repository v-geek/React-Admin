import { getUserInfoApi } from '@/api/modules/user'
import { AppDispatch, RootState } from '..'
import { testThunk } from '../modules/user'

export const getUserInfo = (params: any) => {
  return async (dispatch: AppDispatch, getState: Func<RootState>) => {
    const res = (await getUserInfoApi(params)) as any
    console.log('thunk-res', res)
    dispatch(testThunk({ name: 'thunk-xxx', ...res }))
    return { test: '这是thunk返回的数据' }
  }
}

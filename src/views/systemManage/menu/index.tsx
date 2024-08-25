import { useDispatch } from '@/store'
import { USER_FETCH_JOB, USER_FETCH_LIKES } from '@/store/sagas/actionType'
import { getUserInfo } from '@/store/thunks/user'

const menu = () => {
  const dispatch = useDispatch()

  const test1 = async () => {
    const thunkRes = await dispatch(
      getUserInfo({ pageIndex: 1, pageSize: 10, id: 'wwwwwww' })
    )
    console.log('最后的Res', thunkRes)
  }
  test1()

  const test2 = () => {
    dispatch({
      type: USER_FETCH_LIKES,
      payload: { params: { pageIndex: 1, pageSize: 10, id: '65451516' } },
    })
    dispatch({
      type: USER_FETCH_JOB,
      payload: { params: { pageIndex: 'x', pageSize: 'y', id: 'pppp' } },
    })
  }
  test2()

  return <div>menu</div>
}

export default menu

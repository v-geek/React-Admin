import { put, takeEvery } from 'redux-saga/effects'
import { getUserJobApi, getUserLikesApi } from '@/api/modules/user'
import { testLikesSaga, testLikesJob } from '../modules/user'
import { USER_FETCH_JOB, USER_FETCH_LIKES } from './actionType'
import { PayloadAction } from '@reduxjs/toolkit'

function* fetchUserLikes(action: PayloadAction<Recordable>) {
  try {
    const res = yield getUserLikesApi({ ...action.payload.params })
    console.log('like-res', res)
    yield put(testLikesSaga({ name: 'like-xxx', ...res }))
    // return { test: '这是saga-likes返回的数据' }
  } catch (err) {
    console.log('err', err)
  }
}

function* fetchUserJob(action: PayloadAction<Recordable>) {
  try {
    const res = yield getUserJobApi({ ...action.payload.params })
    console.log('job-res', res)
    yield put(testLikesJob({ name: 'job-xxx', ...res }))
    // return { test: '这是saga-job返回的数据' }
  } catch (err) {
    console.log('err', err)
  }
}

function* UserSaga() {
  yield takeEvery(USER_FETCH_LIKES, fetchUserLikes)
  yield takeEvery(USER_FETCH_JOB, fetchUserJob)
}

export default UserSaga

import { put, takeEvery } from 'redux-saga/effects'
import { getUserJobApi, getUserLikesApi } from '@/api/modules/user'
import { testLikesSaga, testLikesJob } from '../modules/user'
import { USER_FETCH_JOB, USER_FETCH_LIKES } from './actionType'

function* fetchUserLikes(action) {
  try {
    const res = yield getUserLikesApi({ ...action.payload.params })
    console.log('like-res', res)
    yield put(testLikesSaga({ name: 'like-xxx', ...res }))
  } catch (err) {
    console.log('err', err)
  }
}

function* fetchUserJob(action) {
  try {
    const res = yield getUserJobApi({ ...action.payload.params })
    console.log('job-res', res)
    yield put(testLikesJob({ name: 'job-xxx', ...res }))
  } catch (err) {
    console.log('err', err)
  }
}

function* UserSaga() {
  yield takeEvery(USER_FETCH_LIKES, fetchUserLikes)
  yield takeEvery(USER_FETCH_JOB, fetchUserJob)
}

export default UserSaga

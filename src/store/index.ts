import { configureStore, combineReducers, Middleware } from '@reduxjs/toolkit'
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
} from 'react-redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { thunk } from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import permission from './modules/permission'
import system from './modules/system'
import user from './modules/user'
import tabs from './modules/tabs'

import UserSaga from './sagas/user'

const persistReducers = persistReducer(
  {
    key: 'redux-state',
    storage: storage,
    blacklist: ['permission'],
  },
  combineReducers({ permission, system, user, tabs })
)

// --------------- saga -------------
const sagaMiddleware = createSagaMiddleware()
const sagaObj = {
  UserSaga,
}
// ----------------------------

const middleWares: Middleware[] = [thunk, sagaMiddleware]

export const store = configureStore({
  reducer: persistReducers,
  // 关闭序列化检查
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(middleWares),
  devTools: true,
})

Object.values(sagaObj).forEach((saga) => sagaMiddleware.run(saga))

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
export const useDispatch: () => AppDispatch = useReduxDispatch

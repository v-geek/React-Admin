import { configureStore, combineReducers, Middleware } from '@reduxjs/toolkit'
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
} from 'react-redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { thunk } from 'redux-thunk'
import permission from './modules/permission'
import system from './modules/system'
import user from './modules/user'
import tabs from './modules/tabs'

const persistReducers = persistReducer(
  {
    key: 'redux-state',
    storage: storage,
    blacklist: ['permission'],
  },
  combineReducers({ permission, system, user, tabs })
)

const middleWares: Middleware[] = [thunk]

export const store = configureStore({
  reducer: persistReducers,
  // 关闭序列化检查
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(middleWares),
  devTools: true,
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
export const useDispatch: () => AppDispatch = useReduxDispatch

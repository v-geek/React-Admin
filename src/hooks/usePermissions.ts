import { store, useDispatch } from '@/store'
import { setMenuList } from '@/store/modules/permission'
import { setToken } from '@/store/modules/user'
import { getMenuListApi } from '@/api/modules/user'

export const usePermissions = () => {
  const dispatch = useDispatch()

  const initPermissions = async () => {
    const token = store.getState().user.token

    if (!token) return

    try {
      const { data: menuList } = await getMenuListApi()

      dispatch(setMenuList(menuList))

      if (!menuList.length) {
        // notification.warning({
        //   message: '无权限访问',
        //   description: '当前账号无任何菜单权限，请联系系统管理员！',
        // })
        console.log('当前账号无任何菜单权限，请联系系统管理员！')
        dispatch(setToken(''))
        return Promise.reject('No permission')
      }
    } catch (err) {
      dispatch(setToken(''))
      return Promise.reject(err)
    }
  }

  return { initPermissions }
}

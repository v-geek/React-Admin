// 获取菜单权限列表
import dRouter from '@/assets/json/dRouter.json'

export const getMenuListApi = () => {
  // return http.get<RouteList>('/menu/list')
  return Promise.resolve(dRouter)
}

export const getUserInfoApi = (id: string) => {
  console.log('这是传入的Id', id)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('成功了')
    }, 2000)
  })
}

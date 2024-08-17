// 获取菜单权限列表
import dRouter from '@/assets/json/dRouter.json'

export const getMenuListApi = () => {
  // return http.get<RouteList>('/menu/list')
  return Promise.resolve(dRouter)
}

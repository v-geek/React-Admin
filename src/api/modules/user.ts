// 获取菜单权限列表
import dRouter from '@/assets/json/dRouter.json'

export const getMenuListApi = () => {
  // return http.get<MenuList>('/menu/list')
  return Promise.resolve(dRouter)
}

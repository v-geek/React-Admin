// 获取菜单权限列表
import dRouter from '@/assets/json/dRouter.json'

export const getMenuListApi = () => {
  // return http.get<RouteList>('/menu/list')
  return Promise.resolve(dRouter)
}

export const getUserInfoApi = (params: any) => {
  console.log('这是传入的参数-thunk', params)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ success: true, data: { name: 'thunk', info: 'ok' } })
    }, 2000)
  })
}

export const getUserLikesApi = (params: any) => {
  console.log('这是传入的参数-likes', params)

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ success: true, data: { name: 'zzy', hobby: ['sun', 'moon', 'money'] } })
    }, 2000)
  })
}

export const getUserJobApi = (params: any) => {
  console.log('这是传入的参数-job', params)

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ success: true, data: { name: '测试公司', salary: 2800 } })
    }, 2000)
  })
}

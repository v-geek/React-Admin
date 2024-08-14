import { useEffect } from 'react'
import { Spin } from 'antd'
import NProgress from '@/config/progress'
import './index.scss'

export const Loading = () => {
  return (
    <div className="loading-box">
      <Spin size="large" />
    </div>
  )
}

export const PageLoader = () => {
  useEffect(() => {
    NProgress.start()
    return () => {
      NProgress.done()
    }
  }, [])

  return <Loading />
}

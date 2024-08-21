import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import SvgIcon from '@/components/SvgIcon'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="h-full flex-c">
      <SvgIcon name="404" iconStyle={{ width: '252px', height: '294px' }} />

      <div className="flex flex-col ml-[120px] text-base-color">
        <h2 className="text-[28px]">404</h2>
        <h4 className="mt-[25px] mb-5">抱歉, 你访问的页面不存在。</h4>
        <Button type="primary" onClick={() => navigate('/home')}>
          返回首页
        </Button>
      </div>
    </div>
  )
}

export default NotFound

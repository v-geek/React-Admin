import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import SvgIcon from '@/components/SvgIcon'

const NoAuth = () => {
  const navigate = useNavigate()

  return (
    <div className="h-full flex-c">
      <SvgIcon name="403" iconStyle={{ width: '251px', height: '294px' }} />

      <div className="flex flex-col ml-[120px] text-base-color">
        <h2 className="text-[26px]">403</h2>
        <h4 className="mt-[25px] mb-5">抱歉, 你无权访问该页面</h4>
        <Button type="primary" onClick={() => navigate('/home')}>
          返回首页
        </Button>
      </div>
    </div>
  )
}

export default NoAuth

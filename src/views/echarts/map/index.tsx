import ECharts from '@/components/ECharts'
import { GeoJson } from '@/components/ECharts/type'

// 数据来源: https://datav.aliyun.com/portal/school/atlas/area_selector
import mapJson from './json/china-province.json'
// import mapJson from './json/sichuan-city.json'

import { options } from './config'
import './index.scss'

const EChartsMap = () => {
  return (
    <div className="w-full h-full echarts-box">
      <ECharts options={options} mapName="china" mapJson={mapJson as GeoJson} />
    </div>
  )
}

export default EChartsMap

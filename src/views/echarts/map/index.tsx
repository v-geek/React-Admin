import ECharts from '@/components/ECharts'
import { GeoJson } from '@/components/ECharts/type'
import mapJson from './china.json'
import { options } from './config'

const EChartsMap = () => {
  return (
    <div className="w-full h-full">
      <ECharts options={options} mapName="china" mapJson={mapJson as GeoJson} />
    </div>
  )
}

export default EChartsMap

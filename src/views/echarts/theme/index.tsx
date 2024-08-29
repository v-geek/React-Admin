import { useRef } from 'react'
import ECharts from '@/components/ECharts'
import themeConfig from './wonderland.json'
import { options } from './config'

const ChartsDemo = () => {
  const echartsRef = useRef()

  return (
    <div className="bg-white dark:bg-dark py-10">
      <div className="w-full h-[500px]">
        <ECharts
          options={options}
          ref={echartsRef}
          themeName="wonderland"
          themeConfig={themeConfig}
        />
      </div>
    </div>
  )
}

export default ChartsDemo

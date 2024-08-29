import { useEffect, useRef, useState } from 'react'
import Charts from '@/components/Charts'
import { ChartOption } from '@/components/Charts/type'
import themeConfig from './wonderland.json'

const mockOptions: ChartOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  xAxis: {
    type: 'category',
    data: [
      '2022-05-17',
      '2022-05-18',
      '2022-05-19',
      '2022-05-20',
      '2022-05-21',
      '2022-05-22',
      '2022-05-23',
    ],
    axisTick: {
      show: false,
    },
  },
  yAxis: {
    type: 'value',
    splitLine: {
      lineStyle: {
        type: 'dashed',
      },
    },
  },
  series: Array(7)
    .fill('')
    .map((item, index) => ({
      name: `第${index + 1}组`,
      data: Array(7)
        .fill('')
        .map(() => Math.ceil(Math.random() * 400)),
      type: 'bar',
      // itemStyle: {
      //   color: '#2097F3',
      // },
      // barWidth: 30,
    })),
}

const ChartsDemo = () => {
  const [options, setOptions] = useState(mockOptions)
  const echartsRef = useRef()

  // useEffect(() => {
  //   setTimeout(() => {
  //     setOptions((prevState) => {
  //       const newState = { ...prevState }
  //       newState.series[0].itemStyle = { color: '#ff123a' }
  //       console.log('颜色更新了')
  //       return newState
  //     })
  //   }, 2000)
  // }, [])

  return (
    <div className="bg-white dark:bg-dark py-10">
      <div className="w-full h-[500px]">
        <Charts
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

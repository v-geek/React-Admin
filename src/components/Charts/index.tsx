import {
  ForwardedRef,
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { shallowEqual } from 'react-redux'
import { useUpdateEffect } from 'ahooks'
import * as echarts from 'echarts'
import type { ECElementEvent, EChartsType } from 'echarts'
import { RootState, useSelector } from '@/store'
import { throttle } from '@/utils'

export interface ChartsProps {
  options: Recordable
  onClick?: (event: ECElementEvent) => any
}

export interface EChartsRef {
  getChart(): EChartsType
  getChartRef(): any
}

const ECharts = ({ options, onClick }: ChartsProps, ref: ForwardedRef<EChartsRef>) => {
  const [chart, setChart] = useState<EChartsType>()
  const chartRef = useRef<HTMLDivElement>(null)

  // 其他state的变化不会导致组件重新渲染
  const { mainMaximize, isCollapse } = useSelector(
    (state: RootState) => ({
      mainMaximize: state.system.mainMaximize,
      isCollapse: state.system.sideBar.isCollapse,
    }),
    shallowEqual
  )

  // 父组件: ref.current.getChartRef 进行访问
  useImperativeHandle(ref, () => ({
    getChart: () => chart,
    getChartRef: () => chartRef?.current,
  }))

  const updateChart = () => {
    if (!chart) return
    chart.clear()
    chart.setOption(options)
  }

  const resizeChart = throttle(() => {
    // console.log('chart', chart)
    if (!chart) return
    chart.resize()
  }, 200)

  useEffect(() => {
    const chartIns = echarts.init(chartRef.current)

    chartIns.on('click', (event: ECElementEvent) => {
      onClick && onClick(event)
    })

    setChart(chartIns)

    chartIns.setOption(options)

    window.addEventListener('resize', resizeChart)

    return () => {
      window.removeEventListener('resize', resizeChart)
    }
  }, [])

  useUpdateEffect(updateChart, [options])

  useUpdateEffect(resizeChart, [mainMaximize])

  useUpdateEffect(() => {
    setTimeout(resizeChart, 300)
  }, [isCollapse])

  return <div className="chart w-full h-full" ref={chartRef} />
}

const Charts = memo(forwardRef(ECharts))

export default Charts

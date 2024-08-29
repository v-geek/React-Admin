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
// import echarts from './config'
import type { ChartsProps, EChartsRef } from './type'
import { isObject } from '@/utils/is'

const ECharts = (
  { options, onClick, themeName = null, themeConfig }: ChartsProps,
  ref: ForwardedRef<EChartsRef>
) => {
  const chartRef = useRef()
  const [chart, setChart] = useState<EChartsType>()

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
    if (!chart) return
    chart.resize()
  }, 200)

  useEffect(() => {
    let chartIns = null

    if (themeName && isObject(themeConfig)) {
      echarts.registerTheme(themeName, themeConfig)
    }

    chartIns = echarts.init(chartRef.current, themeName)

    chartIns.on('click', (event: ECElementEvent) => {
      onClick && onClick(event)
    })

    setChart(chartIns)

    chartIns.setOption(options)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', resizeChart)
    return () => {
      window.removeEventListener('resize', resizeChart)
    }
    // 避免 resizeChart 中取不到最新的 chart 值
  }, [chart])

  useUpdateEffect(updateChart, [options])

  useUpdateEffect(resizeChart, [mainMaximize])

  useUpdateEffect(() => {
    setTimeout(resizeChart, 300)
  }, [isCollapse])

  return <div className="chart w-full h-full" ref={chartRef} />
}

const Charts = memo(forwardRef(ECharts))

export default Charts

import type { MutableRefObject } from 'react'
import * as echarts from 'echarts'
import type { ComposeOption } from 'echarts/core'
import type {
  BarSeriesOption,
  LineSeriesOption,
  LinesSeriesOption,
  PieSeriesOption,
  ScatterSeriesOption,
  RadarSeriesOption,
  GaugeSeriesOption,
} from 'echarts/charts'
import type {
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption,
} from 'echarts/components'
import type { ECElementEvent, EChartsType } from 'echarts'

export type ChartOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | LinesSeriesOption
  | PieSeriesOption
  | ScatterSeriesOption
  | RadarSeriesOption
  | GaugeSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>

export type GeoJson = Parameters<typeof echarts.registerMap>[1]

export interface ChartsProps {
  // options: ChartOption | null | undefined
  options: any
  onClick?: (event: ECElementEvent) => any
  themeName?: string
  themeConfig?: Recordable
  mapName?: string
  mapJson?: GeoJson
}

export interface EChartsRef {
  getChart: () => EChartsType
  getChartRef: () => MutableRefObject<HTMLDivElement>
}

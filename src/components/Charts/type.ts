import type { MutableRefObject } from 'react'
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

export interface ChartsProps {
  options: ChartOption
  onClick?: (event: ECElementEvent) => any
}

export interface EChartsRef {
  getChart: () => EChartsType
  getChartRef: () => MutableRefObject<HTMLDivElement>
}

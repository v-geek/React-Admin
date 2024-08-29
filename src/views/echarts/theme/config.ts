import { ChartOption } from '@/components/ECharts/type'

export const options: ChartOption = {
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

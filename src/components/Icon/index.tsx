import { createElement, memo, FC } from 'react'
import * as Icons from '@ant-design/icons'
import { createFromIconfontCN } from '@ant-design/icons'

interface IconProps {
  name: string
  className?: string
}

export const Icon: FC<IconProps> = memo(({ name, className }) => {
  if (!name) return
  return createElement(Icons[name], { className })
})

export const IconFont = createFromIconfontCN({
  scriptUrl: ['//at.alicdn.com/t/c/font_3878708_l04g6iwc6y.js'],
})

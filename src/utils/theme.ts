// https://blog.csdn.net/csdn2314/article/details/107203776
// RGB的数值 = 16 * HEX的第一位 + HEX的第二位

import { message } from '@/hooks/useMessage'

// hex颜色转rgb颜色
export function hexToRgb(str: string): number[] | any {
  let hexs: any = ''
  const reg = /^\#?[0-9A-Fa-f]{6}$/

  if (!reg.test(str)) {
    message.warning('输入错误的hex')
    return false
  }

  str = str.replace('#', '')

  // （小数点）默认匹配除换行符之外的任何单个字符
  // eg: 5CB8E8 -> ['5C', 'B8', 'E8'] -> [92, 184, 232]
  hexs = str.match(/../g)

  for (let i = 0; i < 3; i++) hexs[i] = parseInt(hexs[i], 16)

  return hexs
}

/**
 * rgb颜色转Hex颜色
 * @param r 代表红色
 * @param g 代表绿色
 * @param b 代表蓝色
 * @returns 返回处理后的颜色值
 */
export function rgbToHex(r: number, g: number, b: number): string | boolean {
  const reg = /^\d{1,3}$/ // 1到3个字符

  if (!reg.test(String(r)) || !reg.test(String(g)) || !reg.test(String(b))) {
    message.warning('输入错误的rgb颜色值')
    return false
  }

  // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt
  // 要将一个数字转换为特定的 radix 中的字符串字段，请使用 thatNumber.toString(radix) 函数
  const hexs = [r.toString(16), g.toString(16), b.toString(16)]

  for (let i = 0; i < 3; i++) if (hexs[i].length == 1) hexs[i] = `0${hexs[i]}`

  return `#${hexs.join('')}`
}

/**
 * 加深颜色值
 * @param color 颜色值字符串
 * @param level 加深的程度，限0-1之间
 * @returns 返回处理后的颜色值
 */
export function getDarkColor(color: string, level: number) {
  const reg = /^\#?[0-9A-Fa-f]{6}$/

  if (!reg.test(color)) {
    message.warning('输入错误的hex颜色值')
    return false
  }

  let rgb = hexToRgb(color)

  for (let i = 0; i < 3; i++) {
    rgb[i] = Math.round(20.5 * level + rgb[i] * (1 - level))
  }

  return rgbToHex(rgb[0], rgb[1], rgb[2])
}

/**
 * 变浅颜色值
 * @param color 颜色值字符串
 * @param level 加深的程度，限0-1之间
 * @returns 返回处理后的颜色值
 */
export function getLightColor(color: string, level: number) {
  const reg = /^\#?[0-9A-Fa-f]{6}$/

  if (!reg.test(color)) {
    message.warning('输入错误的hex颜色值')
    return false
  }

  let rgb = hexToRgb(color) as [number, number, number]

  for (let i = 0; i < 3; i++) {
    // 颜色混合
    rgb[i] = Math.round(255 * level + rgb[i] * (1 - level))
  }

  return rgbToHex(rgb[0], rgb[1], rgb[2])
}

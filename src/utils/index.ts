import { message } from '@/hooks/useMessage'
import { isString } from './is'

/**
 * 获取浏览器默认语言
 */
export function getBrowserLang(): 'zh' | 'en' {
  const browserLang = navigator.language ? navigator.language : navigator.browserLanguage
  return ['cn', 'zh', 'zh-cn'].includes(browserLang.toLowerCase()) ? 'zh' : 'en'
}

export function setHtmlStyleProperty(key: string, val: string) {
  document.documentElement.style.setProperty(key, val)
}

const mode = import.meta.env.VITE_MODE

export function getUrlWithParams() {
  const url = {
    hash: location.hash.substring(1),
    history: location.pathname + location.search,
  }
  return url[mode]
}

export function debounce<T = any>(
  fn: Function,
  delay: number = 500,
  immediate: boolean = false
) {
  let timer: NodeJS.Timeout | null = null

  return function (...args: T[]) {
    const context = this

    if (timer) clearTimeout(timer)

    if (immediate) {
      const delayEnd = !timer // 第一次执行完Fn后, 没到达delay, 则timer存在
      timer = setTimeout(() => (timer = null), delay)
      delayEnd && fn.apply(context, args)
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args)
      }, delay)
    }
  }
}

export function throttle<T = any>(fn: Function, delay: number = 500) {
  let timer: NodeJS.Timeout | null = null
  let preTime = 0

  // 将this放在函数参数列表上声明类型即可, 使用的时候this不会干扰形参传入顺序
  return function (...args: T[]) {
    if (timer) clearTimeout(timer)

    const nowTime = Date.now()
    // 还有多少时间到下一次触发点, 保证最后一次函数会执行
    const remaining = delay - (nowTime - preTime)
    const context = this

    // 确保第一次函数会执行
    if (remaining <= 0) {
      fn.apply(context, args)
      preTime = Date.now()
    } else {
      // 确保最后一次函数会执行
      timer = setTimeout(() => {
        fn.apply(context, args)
      }, remaining)
    }
  }
}

// 注意事项
// handle函数 写成正常函数, 而不是箭头函数, 确保this可以正常获取到
// eg: 箭头函数, this 为 undefined
// vue中 div元素等 @click 时 this 指向 组件实例
// vue中 el-xxx元素 @click 时 this 为 undefined
// html文件中 内联事件 onclick="debounceFn(this)" 时  this 指向 dom 元素
// html文件中 document.getElementById('test').onclick = debounceFn  this 指向 dom 元素

// 使用示例:
// @click="debounceFn"  const debounceFn = debounce(handleClick, 1000)
// @click="throttleFn"  const throttleFn = throttle(handleClick, 1000)

// const handleFn = (event: any) => {
//   console.log(Math.random())
//   console.log(event)
// }
// window.addEventListener('resize', debounce(handleFn, 1000))
// window.addEventListener('resize', throttle(handleFn, 1000))

// <el-select :remote-method="debounce < string > (getAddrList, 300)">
//   ...
// </el-select>

export const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error('复制操作不被支持或失败: ', err)

    // text是复制文本
    // 创建input元素
    const el = document.createElement('input')
    // 给input元素赋值需要复制的文本
    el.setAttribute('value', text)
    // 将input元素插入页面
    document.body.appendChild(el)
    // 选中input元素的文本
    el.select()
    // 复制内容到剪贴板
    document.execCommand('copy')
    // 删除input元素
    document.body.removeChild(el)
  }

  message.success('复制成功')
}

export function deepClone<T = any>(obj: T) {
  if (obj instanceof Date) return new Date(obj) as T
  if (obj instanceof RegExp) return new RegExp(obj) as T

  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== 'object') return obj

  const cloneObj: any = Array.isArray(obj) ? [] : {}

  for (let key in obj) {
    cloneObj[key] = deepClone(obj[key])
  }

  return cloneObj as T
}

export const delay = (waitTime: number) => {
  return new Promise((resolve) => setTimeout(resolve, waitTime))
}

/**
 * @description: 生成随机数[min, max], 可以取到两边
 */
export function getRandomIntBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function isType(val: unknown) {
  if (val === null) return 'null'
  if (typeof val !== 'object') return typeof val
  else return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase()
}

/**
 * 判断两个对象是否相同
 */
export function isEqualObject(a: Recordable, b: Recordable): Boolean {
  if (!a || !b) return false

  const aProps = Object.getOwnPropertyNames(a)
  const bProps = Object.getOwnPropertyNames(b)

  if (aProps.length != bProps.length) return false

  for (let i = 0; i < aProps.length; i++) {
    const propName = aProps[i]
    const aPropVal = a[propName]
    const bPropVal = b[propName]

    if (!b.hasOwnProperty(propName)) return false

    if (aPropVal instanceof Object) {
      if (!isEqualObject(aPropVal, bPropVal)) return false
    } else if (aPropVal !== bPropVal) {
      return false
    }
  }

  return true
}

export const sleep = (time: number, fn?: Function, ...args: any[]): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(() => {
      fn && fn(...args)
      resolve()
    }, time)
  })

export const def = (obj: object, key: string | symbol, value: any) => {
  Object.defineProperty(obj, key, {
    writable: true,
    enumerable: true,
    configurable: true,
    value,
  })
}

/**
 * @description 处理 prop, 当 prop 为多级嵌套时 -> 返回最后一级 prop
 * */
export function handleProp(prop: string): string {
  if (!isString(prop)) throw new Error('prop传递错误')
  if (prop === '') throw new Error('prop不能为空')
  const propArr = prop.split('.')
  if (propArr.length === 1) return prop
  return propArr[propArr.length - 1]
}

export const getValueByCasKey = <T = any>(data: Recordable, key: string) => {
  key.split('.').forEach((key) => (data = data[key]))
  return data as T
}

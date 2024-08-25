import { NavigateFunction } from 'react-router-dom'

declare global {
  interface Window {
    $navigate: NavigateFunction
  }

  interface Navigator {
    browserLanguage: string
  }

  // 全屏 按钮组件 需要使用
  interface Document {
    webkitFullscreenElement: any
    mozFullScreenElement: any
    msFullscreenElement: any
    cancelFullScreen: any
    webkitCancelFullScreen: any
    mozCancelFullScreen: any
    msCancelFullScreen: any
  }
}

export {}

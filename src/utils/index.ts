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

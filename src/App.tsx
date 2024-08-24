import { useEffect } from 'react'
import { shallowEqual } from 'react-redux'
import { ConfigProvider, theme, App as AppProvider } from 'antd'
import { HappyProvider } from '@ant-design/happy-work-theme'
import enUS from 'antd/locale/en_US'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { I18nextProvider } from 'react-i18next'
import { RootState, useDispatch, useSelector } from './store'
import Router from '@/router'
import { getBrowserLang } from './utils'
import { setSystemState } from './store/modules/system'
import { LanguageType } from './store/types'
import i18n from './languages'
import { RefreshProvider } from './context/Refresh'

const App = () => {
  const dispatch = useDispatch()

  const { componentSize, language, themeColor, isDark, compactAlgorithm, isHappy } =
    useSelector(
      (state: RootState) => ({
        componentSize: state.system.componentSize,
        language: state.system.language,
        themeColor: state.system.themeColor,
        isDark: state.system.isDark,
        compactAlgorithm: state.system.compactAlgorithm,
        isHappy: state.system.isHappy,
      }),
      shallowEqual
    )

  const algorithm = () => {
    const algorithmArr = isDark ? [theme.darkAlgorithm] : [theme.defaultAlgorithm]
    if (compactAlgorithm) algorithmArr.push(theme.compactAlgorithm)
    return algorithmArr
  }

  const initLanguage = () => {
    const result = language ?? getBrowserLang()
    dispatch(setSystemState({ key: 'language', value: result as LanguageType }))
    i18n.changeLanguage(language)
    dayjs.locale(language === 'zh' ? 'zh-cn' : 'en')
  }

  useEffect(() => {
    initLanguage()
  }, [language])

  return (
    <ConfigProvider
      locale={language === 'zh' ? zhCN : enUS}
      componentSize={componentSize}
      theme={{
        token: { colorPrimary: themeColor },
        algorithm: algorithm(),
        cssVar: true,
        hashed: false,
      }}
    >
      <HappyProvider disabled={!isHappy}>
        <AppProvider>
          <I18nextProvider i18n={i18n}>
            <RefreshProvider>
              <Router />
            </RefreshProvider>
          </I18nextProvider>
        </AppProvider>
      </HappyProvider>
    </ConfigProvider>
  )
}

export default App

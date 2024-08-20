import { useEffect } from 'react'
import { theme } from 'antd'
import { shallowEqual } from 'react-redux'
import { RootState, useSelector } from '@/store'
import { setHtmlStyleProperty } from '@/utils'
import { getDarkColor, getLightColor } from '@/utils/theme'

const useTheme = () => {
  const { token } = theme.useToken()

  const { isDark, themeColor, compactAlgorithm, grayMode, weakMode } = useSelector(
    (state: RootState) => ({
      isDark: state.system.isDark,
      themeColor: state.system.themeColor,
      compactAlgorithm: state.system.compactAlgorithm,
      grayMode: state.system.grayMode,
      weakMode: state.system.weakMode,
    }),
    shallowEqual
  )

  useEffect(() => changeDark(), [isDark])
  useEffect(() => changeTheme(), [themeColor, compactAlgorithm])
  useEffect(() => changeGrayOrWeak(), [grayMode, weakMode])

  const changeDark = () => {
    const html = document.documentElement
    html.classList[isDark ? 'add' : 'remove']('dark')
    changeTheme()
  }

  const changeTheme = () => {
    Object.entries(token).forEach(([key, val]) => setHtmlStyleProperty(`--${key}`, val))

    for (let i = 1; i <= 9; i++) {
      setHtmlStyleProperty(
        `--colorPrimary${i}`,
        !isDark
          ? `${getLightColor(themeColor, i / 10)}`
          : `${getDarkColor(themeColor, i / 10)}`
      )
    }
  }

  const changeGrayOrWeak = () => {
    const html = document.documentElement
    html.style.filter = grayMode ? 'invert(80%)' : weakMode ? 'grayscale(1)' : ''
  }
}

export default useTheme

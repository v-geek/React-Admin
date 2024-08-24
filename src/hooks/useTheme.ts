import { useEffect } from 'react'
import { shallowEqual } from 'react-redux'
import { RootState, useSelector } from '@/store'
import { setHtmlStyleProperty } from '@/utils'
import { getDarkColor, getLightColor } from '@/utils/theme'
import commonTheme from '@/styles/theme/common'

const useTheme = () => {
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
    const type = isDark ? 'dark' : 'light'

    Object.entries(commonTheme[type]).forEach(([key, val]) =>
      setHtmlStyleProperty(key, val as string)
    )

    for (let i = 1; i <= 9; i++) {
      setHtmlStyleProperty(
        `--ant-color-primary-${i}`,
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

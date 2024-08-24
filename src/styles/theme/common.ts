const prefix = 'admin'

const config = {
  light: {
    'main-bg': '#f0f2f5',
    'border-color-light': '#e4e7ed',
    'sidebar-bg': '#001529',
    'menu-scrollbar-thumb-bg': '#2b3b4b',
    'main-scrollbar-bg': '',
  },
  dark: {
    'main-bg': '#141414',
    'border-color-light': '#414243',
    'sidebar-bg': '#2d2d2d',
    'menu-scrollbar-thumb-bg': 'rgba(163,166,173, 0.3)',
    'main-scrollbar-bg': '#676767 #424242',
  },
}

const commonTheme = {}

for (const [themeKey, themeObj] of Object.entries(config)) {
  const temp = {}
  for (const [key, value] of Object.entries(themeObj)) {
    temp[`--${prefix}-${key}`] = value
  }
  commonTheme[themeKey] = temp
}

export default commonTheme

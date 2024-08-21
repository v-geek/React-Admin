import { useState } from 'react'
import { shallowEqual } from 'react-redux'
import { Drawer, Switch, Divider, ColorPicker, theme } from 'antd'
import type { AggregationColor } from 'antd/es/color-picker/color'
import type { PresetsItem } from 'antd/es/color-picker/interface'
import { SettingOutlined } from '@ant-design/icons'
import { RootState, useDispatch, useSelector } from '@/store'
import { setSystemState } from '@/store/modules/system'

const Setting = () => {
  const [visible, setVisible] = useState(false)

  const dispatch = useDispatch()

  const { themeColor, grayMode, weakMode, menuAccordion, isHappy } = useSelector(
    (state: RootState) => ({
      themeColor: state.system.themeColor,
      grayMode: state.system.grayMode,
      weakMode: state.system.weakMode,
      menuAccordion: state.system.menuAccordion,
      isHappy: state.system.isHappy,
    }),
    shallowEqual
  )

  const presets: PresetsItem[] = [
    {
      label: '预定义',
      colors: [
        '#1890ff',
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#c71585',
      ],
    },
  ]

  const changeTheme = (value: AggregationColor) => {
    dispatch(setSystemState({ key: 'themeColor', value: value.toHexString() }))
  }

  // console.log('theme.useToken()', theme.useToken())

  const changeGray = (value: boolean) => {
    if (weakMode) dispatch(setSystemState({ key: 'weakMode', value: false }))
    dispatch(setSystemState({ key: 'grayMode', value }))
  }

  const changeWeak = (value: boolean) => {
    if (grayMode) dispatch(setSystemState({ key: 'grayMode', value: false }))
    dispatch(setSystemState({ key: 'weakMode', value }))
  }

  return (
    <>
      <div className="header-icon" onClick={() => setVisible(true)}>
        <SettingOutlined />
      </div>

      <Drawer
        title="项目设置"
        open={visible}
        onClose={() => setVisible(false)}
        className="set-box"
      >
        <Divider>主题设置</Divider>

        <div className="flex flex-col gap-6">
          <div className="flex-between">
            <span>主题颜色</span>
            <ColorPicker
              value={themeColor}
              presets={presets}
              onChange={changeTheme}
              disabledAlpha
            />
          </div>

          <div className="flex-between">
            <span>灰色模式</span>
            <Switch checked={grayMode} onChange={changeGray} />
          </div>

          <div className="flex-between">
            <span>色弱模式</span>
            <Switch checked={weakMode} onChange={changeWeak} />
          </div>
        </div>

        <Divider>界面设置</Divider>

        <div className="flex flex-col gap-6">
          <div className="flex-between">
            <span>菜单手风琴</span>
            <Switch
              checked={menuAccordion}
              onChange={(value) =>
                dispatch(setSystemState({ key: 'menuAccordion', value }))
              }
            />
          </div>

          <div className="flex-between">
            <span>快乐模式</span>
            <Switch
              checked={isHappy}
              onChange={(value) => dispatch(setSystemState({ key: 'isHappy', value }))}
            />
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default Setting

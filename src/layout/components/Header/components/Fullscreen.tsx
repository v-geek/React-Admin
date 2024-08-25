import { useEffect, useState } from 'react'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'

const Fullscreen = () => {
  const [fullscreen, setFullscreen] = useState(false)

  const onEsc = () => {
    setFullscreen((prevFull) => !prevFull)
  }

  useEffect(() => {
    document.addEventListener('webkitfullscreenchange', onEsc)
    document.addEventListener('mozfullscreenchange', onEsc)
    document.addEventListener('fullscreenchange', onEsc)
    document.addEventListener('msfullscreenchange', onEsc)

    return () => {
      document.removeEventListener('webkitfullscreenchange', onEsc)
      document.removeEventListener('mozfullscreenchange', onEsc)
      document.removeEventListener('fullscreenchange', onEsc)
      document.removeEventListener('MSFullscreenChange', onEsc)
    }
  }, [])

  const toggle = () => {
    // 判断是否是全屏  fullScreenElement: 是否是全屏状态  ie:ms
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    ) {
      // 退出全屏
      if (document.cancelFullScreen) {
        document.cancelFullScreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.msCancelFullScreen) {
        document.msCancelFullScreen()
      }
    } else {
      // 全屏
      document.documentElement.requestFullscreen()
    }
  }

  return (
    <div className="header-icon" onClick={toggle}>
      {!fullscreen ? <FullscreenOutlined /> : <FullscreenExitOutlined />}
    </div>
  )
}

export default Fullscreen

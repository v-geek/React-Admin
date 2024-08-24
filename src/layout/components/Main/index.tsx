import { useRef, useContext, useState } from 'react'
import { useLocation, useMatches, useOutlet } from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { useUpdateEffect } from 'ahooks'
import { RefreshContext } from '@/context/Refresh'
import { Meta } from '@/router/types'

const Main = () => {
  const outlet = useOutlet()
  const { pathname } = useLocation()
  const nodeRef = useRef()
  const { outletShow } = useContext(RefreshContext)
  const matches = useMatches()

  const [mainFull, setMainFull] = useState(false)

  // 监听路由变化
  useUpdateEffect(() => {
    const meta = matches[matches.length - 1]?.data as Meta & { redirect: boolean }
    if (!meta) return
    setMainFull(!!meta.mainFull)
  }, [matches])

  return (
    <SwitchTransition>
      <CSSTransition
        classNames="fade-transform"
        key={pathname}
        nodeRef={nodeRef}
        timeout={300}
        exit={false}
        unmountOnExit
      >
        <div ref={nodeRef} className={`main ${mainFull ? null : 'p-4'}`}>
          {outletShow && outlet}
        </div>
      </CSSTransition>
    </SwitchTransition>
  )
}

export default Main

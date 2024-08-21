import { useRef, useContext } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { RefreshContext } from '@/context/Refresh'

const Main = () => {
  const outlet = useOutlet()
  const { pathname } = useLocation()
  const nodeRef = useRef()
  const { outletShow } = useContext(RefreshContext)

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
        <div ref={nodeRef} className="main">
          {outletShow && outlet}
        </div>
      </CSSTransition>
    </SwitchTransition>
  )
}

export default Main

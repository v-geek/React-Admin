import { useRef } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

const Main = () => {
  const outlet = useOutlet()
  const { pathname } = useLocation()
  const nodeRef = useRef()

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
        <div ref={nodeRef} className="main-box">
          {outlet}
        </div>
      </CSSTransition>
    </SwitchTransition>
  )
}

export default Main

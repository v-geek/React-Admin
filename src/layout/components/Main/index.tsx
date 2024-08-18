import { useLocation, useOutlet } from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

const Main = () => {
  const outlet = useOutlet()
  const { pathname } = useLocation()

  return (
    // <SwitchTransition>
    //   <CSSTransition
    //     classNames="fade"
    //     key={pathname}
    //     timeout={300}
    //     exit={false}
    //     unmountOnExit
    //   >
    //     <div>{outlet}</div>
    //   </CSSTransition>
    // </SwitchTransition>
    <div>{outlet}</div>
  )
}

export default Main

import { useEffect } from 'react'
import { RootState, useSelector, useDispatch } from '@/store'
import { setSystemState } from '@/store/modules/system'
import Iconify from '@/components/Icon/Iconify'
import './index.scss'

const MaximizeIcon = () => {
  const dispatch = useDispatch()
  const mainMaximize = useSelector((state: RootState) => state.system.mainMaximize)

  useEffect(() => {
    const root = document.getElementById('root') as HTMLElement
    root.classList.toggle('main-maximize', mainMaximize)
  }, [mainMaximize])

  const exitMaximize = () => {
    dispatch(setSystemState({ key: 'mainMaximize', value: false }))
  }

  return (
    <>
      {mainMaximize && (
        <div className="max-close-icon" onClick={exitMaximize}>
          <Iconify icon="ep:close" />
        </div>
      )}
    </>
  )
}

export default MaximizeIcon

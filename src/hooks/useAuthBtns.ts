import { RootState, useSelector } from '@/store'
import { getMenuItemByPath } from '@/router/utils'

const useAuthBtns = () => {
  const buttonData = useSelector((state: RootState) => state.permission.buttonData)

  const meta = getMenuItemByPath()?.meta ?? {}
  const path = meta.key

  const buttonsObj: Recordable<boolean> = {}

  buttonData[path].forEach((name) => (buttonsObj[name] = true))

  return {
    buttonsObj,
  }
}

export default useAuthBtns

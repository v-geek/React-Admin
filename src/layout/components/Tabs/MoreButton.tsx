import { Dropdown } from 'antd'
import SvgIcon from '@/components/SvgIcon'
import { useOperate } from './useOperate'

const MoreButton = ({ curTab }) => {
  const { getDropdownItems } = useOperate(curTab?.fullPath)

  return (
    <div className="more-button">
      <Dropdown
        menu={{ items: getDropdownItems(curTab) }}
        placement="bottomRight"
        arrow={true}
      >
        <span className="icon">
          <SvgIcon name="arrow-down" />
        </span>
      </Dropdown>
    </div>
  )
}

export default MoreButton

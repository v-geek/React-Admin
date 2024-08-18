import { Icon } from '@iconify/react'

const Iconify = ({ icon = '', ...attrs }) => (
  <Icon
    icon={icon}
    style={
      attrs?.style ? Object.assign(attrs.style, { outline: 'none' }) : { outline: 'none' }
    }
    {...attrs}
  />
)

export default Iconify

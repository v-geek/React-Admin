import { memo, CSSProperties } from 'react'

interface SvgProps {
  name: string
  iconStyle?: CSSProperties
}

const SvgIcon = ({ name, iconStyle }: SvgProps) => {
  const symbolId = `#icon-${name}`

  return (
    <svg aria-hidden="true" className="w-[1em] h-[1em] fill-current" style={iconStyle}>
      <use xlinkHref={symbolId} />
    </svg>
  )
}

export default memo(SvgIcon)

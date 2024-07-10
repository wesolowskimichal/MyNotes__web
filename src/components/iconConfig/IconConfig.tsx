import { ReactNode, useEffect, useState } from 'react'
import { IconContext } from 'react-icons'

type IconConfigProps = {
  color?: string
  size?: string
  themeColor?: 'backgroundColor' | 'prideColor' | 'fontColor'
  children: ReactNode
}

const IconConfig = ({ color, size, themeColor, children }: IconConfigProps) => {
  const [fillColor, setFillColor] = useState(color)

  useEffect(() => {
    if (color || !themeColor) {
      return
    }
    const rootStyle = getComputedStyle(document.documentElement)
    const rootColor = rootStyle.getPropertyValue(`--${themeColor}`).trim()
    setFillColor(rootColor)
  }, [])

  return (
    <>
      <IconContext.Provider value={{ color: fillColor, size: size }}>{children}</IconContext.Provider>
    </>
  )
}

export default IconConfig

import { useEffect, useState } from 'react'

export const useScreenWidth = () => {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const isMobile = width < 768
  const isTablet = width < 1280

  return { isMobile, isTablet }
}

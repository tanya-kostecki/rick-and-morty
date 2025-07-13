import { useCallback, useState } from 'react'

export const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen((prevState) => !prevState)
  }, [setIsOpen])

  return { isOpen, toggleOpen }
}

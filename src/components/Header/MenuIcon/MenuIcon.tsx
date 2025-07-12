import React from 'react'

import styles from './MenuIcon.module.scss'

interface BurgerIconProps {
  isOpen: boolean
  onClick?: () => void
  className?: string
}

export const MenuIcon: React.FC<BurgerIconProps> = ({ isOpen, onClick, className }) => {
  return (
    <button
      className={`${styles.burger} ${isOpen ? styles.open : ''} ${className || ''}`}
      onClick={onClick}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      tabIndex={0}
    >
      <span />
      <span />
      <span />
    </button>
  )
}

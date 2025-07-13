import clsx from 'clsx'
import { useState } from 'react'

import { ArrowIcon } from '../../assets/icons/ArrowIcon'

import styles from './Select.module.scss'

export const Select = () => {
  const [isOpen, setIsOpen] = useState(false)

  const onArrowClick = () => {
    setIsOpen((prevState) => !prevState)
  }

  return (
    <div
      className={styles.selectContainer}
      role="button"
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-labelledby="custom-select-label"
      tabIndex={0}
    >
      <span id="custom-select-label">EN</span>
      <ArrowIcon
        onClick={onArrowClick}
        className={clsx(styles.arrow, isOpen && styles.up)}
        width={20}
        height={20}
      />
    </div>
  )
}

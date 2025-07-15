import clsx from 'clsx'
import type { ReactNode } from 'react'

import styles from './Card.module.scss'

type Props = {
  children: ReactNode
  className?: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}
export const Card = ({ children, className, onMouseEnter, onMouseLeave }: Props) => {
  return (
    <div
      className={clsx(styles.card, className)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  )
}

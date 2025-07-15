import clsx from 'clsx'
import type { ReactNode } from 'react'

import styles from './Card.module.scss'

type Props = {
  children: ReactNode
  className?: string
  onMouseEnter?: () => void
}
export const Card = ({ children, className, onMouseEnter }: Props) => {
  return (
    <div className={clsx(styles.card, className)} onMouseEnter={onMouseEnter}>
      {children}
    </div>
  )
}

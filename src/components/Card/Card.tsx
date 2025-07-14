import clsx from 'clsx'
import type { ReactNode } from 'react'

import styles from './Card.module.scss'

type Props = {
  children: ReactNode
  className?: string
}
export const Card = ({ children, className }: Props) => {
  return <div className={clsx(styles.card, className)}>{children}</div>
}

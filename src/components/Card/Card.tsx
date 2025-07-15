import clsx from 'clsx'
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

import styles from './Card.module.scss'

type Props<T extends ElementType = 'div'> = {
  children: ReactNode
  className?: string
  onMouseEnter?: () => void
  as?: T
} & ComponentPropsWithoutRef<T>
export const Card = <T extends ElementType = 'div'>({
  children,
  className,
  onMouseEnter,
  as,
  to,
  ...props
}: Props<T>) => {
  const Component = as ? NavLink : 'div'
  return (
    <Component
      to={to}
      className={clsx(styles.card, className)}
      onMouseEnter={onMouseEnter}
      {...props}
    >
      {children}
    </Component>
  )
}

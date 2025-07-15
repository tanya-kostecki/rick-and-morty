import clsx from 'clsx'
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import styles from './Title.module.scss'

type Props<T extends ElementType = 'h1'> = {
  children: ReactNode
  className?: string
  as?: T
} & ComponentPropsWithoutRef<T>

export const Title = <T extends ElementType = 'h1'>({
  children,
  className,
  as,
  ...props
}: Props<T>) => {
  const Component = as || 'h1'
  return (
    <Component className={clsx(styles.title, className)} {...props}>
      {children}
    </Component>
  )
}
